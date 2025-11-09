import React, { useEffect, useState } from 'react';
import { RecompensaCard } from '../../EDU/Card/Recompensa';
import { CoinsChip } from '../../EDU/CoinsChip';
import { Modal } from '../../EDU/Modal';
import { CheckCircle } from 'lucide-react';
import { api, Product } from '../../../lib/api';
import { appConfig } from '../../../lib/config';
import { useStudent } from '../../../context/StudentContext';

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 8 })
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('');
};

export function StudentMarketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBuying, setIsBuying] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [codigoResgate, setCodigoResgate] = useState('');
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const { student, error: studentError, updateCoins } = useStudent();

  const saldoAtual = student?.coins ?? Number(import.meta.env.VITE_STUDENT_COINS ?? 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.listProducts();
        setProducts(response);
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : 'Não foi possível carregar o marketplace.';
        setProductsError(message);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePurchase = async () => {
    if (!selectedProduct || isBuying) return;

    setIsBuying(true);
    setLastError(null);

    try {
      const response = await api.buyProduct(appConfig.defaultStudentId, selectedProduct.id);

      if (!response.success) {
        setLastError(response.message);
        return;
      }

      const newBalance = response.remaining_coins ?? Math.max(saldoAtual - selectedProduct.price, 0);
      updateCoins(newBalance);
      setCodigoResgate(generateCode());
      setPurchaseMessage(response.message);
      setShowConfirmation(true);
      setSelectedProduct(null);
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Não foi possível concluir a troca.';
      setLastError(message);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="pb-20 px-6 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1C1C1E] mb-2">Marketplace</h2>
          <p className="text-[#9CA3AF]">Troque suas moedas por recompensas</p>
        </div>
        <CoinsChip amount={saldoAtual} size="large" />
      </div>

      <div className="space-y-4">
        {studentError && (
          <div className="p-4 bg-red-50 rounded-2xl text-red-600 border border-red-100">
            {studentError}
          </div>
        )}

        {productsError && (
          <div className="p-4 bg-red-50 rounded-2xl text-red-600 border border-red-100">
            {productsError}
          </div>
        )}

        {isLoadingProducts ? (
          <div className="text-center text-[#9CA3AF] py-12">
            Carregando catálogo de recompensas...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-[#9CA3AF] py-12">
            Ainda não há recompensas cadastradas na API.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
            <div className="flex gap-4 pb-2">
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[280px]">
                  <RecompensaCard
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    icon={
                      <div className="text-5xl">
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                    }
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          setLastError(null);
        }}
        title={selectedProduct?.name || ''}
        actions={[
          {
            label: 'Cancelar',
            onClick: () => {
              setSelectedProduct(null);
              setLastError(null);
            },
            variant: 'ghost',
          },
          {
            label: isBuying ? 'Processando...' : 'Trocar Agora',
            onClick: handlePurchase,
            variant: 'primary',
          },
        ]}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-[#AEC6FF] to-[#2D5BFF] text-white text-4xl flex items-center justify-center mb-4">
                {selectedProduct.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-[#9CA3AF] mb-4">{selectedProduct.description}</p>
            </div>

            <div className="bg-[#F6F7F9] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span>Preço</span>
                <CoinsChip amount={selectedProduct.price} />
              </div>
              <div className="flex items-center justify-between">
                <span>Saldo após troca</span>
                <CoinsChip amount={Math.max(saldoAtual - selectedProduct.price, 0)} />
              </div>
            </div>

            {lastError && (
              <div className="p-4 bg-red-50 rounded-2xl text-red-600 text-center border border-red-100">
                {lastError}
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Troca Realizada! 🎉"
        actions={[
          {
            label: 'Continuar Explorando',
            onClick: () => setShowConfirmation(false),
            variant: 'primary',
          },
        ]}
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h3 className="text-[#1C1C1E]">Sucesso!</h3>
          <p className="text-[#9CA3AF]">
            {purchaseMessage || 'Apresente o código abaixo na secretaria para resgatar sua recompensa.'}
          </p>

          <div className="p-6 bg-gradient-to-br from-[#2D5BFF] to-[#1E40AF] rounded-2xl">
            <small className="text-white/80 block mb-2">Código de Resgate</small>
            <p className="text-white text-3xl tracking-widest mb-2">{codigoResgate}</p>
            <small className="text-white/80">Anote ou tire um print desta tela</small>
          </div>

          <div className="p-4 bg-[#F6F7F9] rounded-2xl">
            <div className="flex items-center justify-between">
              <span>Novo saldo</span>
              <CoinsChip amount={saldoAtual} size="large" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
