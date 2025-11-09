import React, { useState } from "react";
import { Button } from "../EDU/Button";
import { BackButton } from "../EDU/BackButton";
import {
  GraduationCap,
  UserRound,
  Briefcase,
  Mail,
  Lock,
  Eye,
} from "lucide-react";
import logo from "figma:asset/09f7ee12a8c5086d31827a15c309403f49a5355c.png";

interface LoginProps {
  onLoginSuccess: () => void;
  onBack?: () => void;
}

export function Login({ onLoginSuccess, onBack }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<
    "student" | "teacher" | "manager"
  >("student");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      onLoginSuccess();
    }
  };

  const roles = [
    {
      id: "student" as const,
      label: "Aluno",
      icon: <GraduationCap size={24} />,
      colors: ["#5B7CFF", "#6BCBFF"],
    },
    {
      id: "teacher" as const,
      label: "Professor",
      icon: <UserRound size={24} />,
      colors: ["#A855F7", "#EC4899"],
    },
    {
      id: "manager" as const,
      label: "Gestor",
      icon: <Briefcase size={24} />,
      colors: ["#F97316", "#F43F5E"],
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-[#F6F7F9] px-6 flex flex-col">
      <div className="pt-8">
        {onBack && (
          <div className="pb-4">
            <BackButton onClick={onBack} />
          </div>
        )}
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="AurellIA" className="w-40 mb-6" />
          <h1 className="text-2xl font-semibold text-[#1C1C1E] mb-1">
            Bem-vindo de volta!
          </h1>
          <p className="text-[#9CA3AF]">Entre com suas credenciais</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-8 space-y-6">
        <div>
          <p className="text-[#9CA3AF] mb-3 text-sm">Entrar como:</p>
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 px-3 py-4 text-sm transition-all ${
                  selectedRole === role.id
                    ? "border-transparent text-white shadow-lg"
                    : "border-[#E0E3E7] text-[#1C1C1E] bg-white"
                }`}
                style={
                  selectedRole === role.id
                    ? {
                        backgroundImage: `linear-gradient(135deg, ${role.colors[0]}, ${role.colors[1]})`,
                      }
                    : undefined
                }
              >
                <span
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    selectedRole === role.id
                      ? "bg-white/20 text-white"
                      : "bg-[#F6F7F9] text-[#9CA3AF]"
                  }`}
                >
                  {role.icon}
                </span>
                {role.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#1C1C1E] mb-1 block">E-mail</label>
            <div className="flex items-center gap-2 bg-white border-2 border-transparent focus-within:border-[#5B7CFF] rounded-2xl px-4 py-3 shadow-sm">
              <Mail size={18} className="text-[#9CA3AF]" />
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                className="flex-1 text-sm text-[#1C1C1E] placeholder:text-[#C0C3CB] focus:outline-none bg-transparent"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#1C1C1E] mb-1 block">Senha</label>
            <div className="flex items-center gap-2 bg-white border-2 border-transparent focus-within:border-[#5B7CFF] rounded-2xl px-4 py-3 shadow-sm">
              <Lock size={18} className="text-[#9CA3AF]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="flex-1 text-sm text-[#1C1C1E] placeholder:text-[#C0C3CB] focus:outline-none bg-transparent"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Eye size={18} className="text-[#C0C3CB]" />
              </button>
            </div>
          </div>
        </div>

        <button className="text-[#2D5BFF] text-right text-sm hover:underline">
          Esqueci minha senha
        </button>

        <Button
          variant="primary"
          fullWidth
          onClick={handleLogin}
          state={email && password ? "default" : "disabled"}
          className="rounded-2xl h-12 text-base"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
