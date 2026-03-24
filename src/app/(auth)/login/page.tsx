"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

type LoginForm = z.infer<typeof loginSchema>;

const roles = [
  { value: "AGENCE", label: "Agence" },
  { value: "CLIENT", label: "Client" },
  { value: "CLOSER", label: "Closer" },
] as const;

const roleDashboard: Record<string, string> = {
  AGENCE: "/agence/dashboard",
  CLIENT: "/client/dashboard",
  CLOSER: "/closer/dashboard",
};

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("AGENCE");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Identifiants incorrects. Veuillez réessayer.");
      } else {
        router.push(roleDashboard[selectedRole] || "/agence/dashboard");
        router.refresh();
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-subtle" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Login Container */}
      <main className="relative z-10 w-full max-w-[480px] px-6">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <h1 className="font-headline font-black text-4xl tracking-tighter text-gradient mb-2">
            Celexia
          </h1>
          <p className="text-on-surface-variant font-medium tracking-wide uppercase text-[10px] space-x-1">
            <span>CRM</span> <span>&bull;</span> <span>B2B</span>{" "}
            <span>&bull;</span> <span>PREMIUM</span>
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass-panel rounded-xl p-8 border border-outline-variant/15 shadow-[0px_0px_32px_rgba(180,197,255,0.08)]">
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-bold text-white mb-2">
              Bon retour
            </h2>
            <p className="text-on-surface-variant text-sm">
              Accédez à votre espace de pilotage commercial.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selector */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                Type de compte
              </label>
              <div className="grid grid-cols-3 gap-2 bg-surface-lowest p-1 rounded-full border border-outline-variant/10">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                      selectedRole === role.value
                        ? "bg-surface-high text-primary-light border border-primary/20 shadow-sm"
                        : "text-on-surface-variant hover:text-white"
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2"
              >
                Adresse E-mail
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="nom@entreprise.fr"
                  className="w-full bg-surface-lowest border-0 border-b border-outline-variant/30 py-4 pl-12 pr-4 text-sm text-white focus:ring-0 focus:border-primary focus:border-b-2 transition-all outline-none rounded-t-lg"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Mot de passe
                </label>
                <button
                  type="button"
                  className="text-[11px] font-semibold text-primary-light hover:text-secondary transition-colors uppercase tracking-tight"
                >
                  Oublié ?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="w-full bg-surface-lowest border-0 border-b border-outline-variant/30 py-4 pl-12 pr-12 text-sm text-white focus:ring-0 focus:border-primary focus:border-b-2 transition-all outline-none rounded-t-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-outline-variant bg-surface-lowest text-primary focus:ring-primary focus:ring-offset-0"
              />
              <label
                htmlFor="remember"
                className="text-xs text-on-surface-variant font-medium"
              >
                Rester connecté pendant 30 jours
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-error-container/20 border border-error/20">
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-brand text-white font-headline font-bold py-4 rounded-xl flex items-center justify-center space-x-2 glow-hover transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Connexion en cours..." : "Se connecter"}</span>
              {!loading && (
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              )}
            </button>
          </form>

          {/* Bottom Action */}
          <div className="mt-8 pt-6 border-t border-outline-variant/10 text-center">
            <p className="text-sm text-on-surface-variant">
              Nouveau sur Celexia ?
              <button className="text-primary-light font-bold hover:underline underline-offset-4 ml-1">
                Contacter le support
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center px-4">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-on-surface-variant/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500/50" />
            <span>SYSTEM_STATUS_ONLINE</span>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant/50">
            v2.4.0_STABLE
          </div>
        </div>
      </main>

      {/* Decorative Element */}
      <div className="fixed right-[-5%] top-[20%] w-[300px] h-[600px] opacity-20 pointer-events-none hidden lg:block">
        <div className="w-full h-full border-l border-t border-outline-variant/20 rounded-tl-[100px] rotate-12 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border-l border-t border-outline-variant/10 rounded-tl-[80px]" />
        </div>
      </div>
    </div>
  );
}
