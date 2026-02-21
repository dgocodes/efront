import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authService } from "@/lib/authService";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // Proteção para rotas de Admin ou Vendedor
  const isProtectedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/vendedor");

  if (isProtectedRoute && !token) {

console.log(`🔍 Acessando rota: ${pathname} | Token: ${!!token} | Refresh: ${!!refreshToken}`);
console.log(`🔍 Acessando rota: ${pathname} | Token: ${token} | Refresh: ${refreshToken}`);

    // Se não tem token, mas tem o refresh, tentamos o serviço
    if (refreshToken) {
      try {
        // Chamamos o método que você já tem no authService
        const res = await authService.refresh(`refreshToken=${refreshToken}`);

        if (res.ok) {
          // 2. Criamos a resposta de "seguir adiante"
          const nextResponse = NextResponse.next();

          // 3. O PULO DO GATO: Pegamos o 'Set-Cookie' da API e jogamos no navegador
          const setCookie = res.headers.get('set-cookie');
          if (setCookie) {
            // Isso instrui o navegador a gravar o novo token/refreshToken
            nextResponse.headers.set('set-cookie', setCookie);
          }

          console.log("✅ Cookies repassados para o navegador com sucesso.");
          return nextResponse;
        }
      } catch (err) {
        console.error("Falha na renovação automática via Proxy:", err);
      }
    }

    // Se não tinha refresh ou o refresh falhou, tchau!
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vendedor/:path*"],
};
