package news.servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import org.omg.CORBA.*;
import org.omg.CosNaming.*;
import org.omg.CosNaming.NamingContextPackage.*;
import BufferApp.*;

/**
 * Servlet que gestiona el límite máximo del buffer de noticias.
 * Permite modificar el número máximo de noticias permitidas en el buffer.
 * @author chris
 * @version 1.0
 */

public class LimiteServlet extends HttpServlet {

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
    throws IOException, ServletException {

        String limiteStr = request.getParameter("limite");

        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();

        out.println("<html><head><meta charset='UTF-8'>");
        out.println("<title>Resultado</title></head><body>");

        try {
            int limite = Integer.parseInt(limiteStr);

            if (limite <= 0) {
                out.println("<h2>Error</h2>");
                out.println("<p>El límite debe ser mayor que 0</p>");
                out.println("<br><a href='index.html'>Volver</a>");
                out.println("</body></html>");
                return;
            }

            String[] args = {"-ORBInitialPort", "1050"};
            ORB orb = ORB.init(args, null);
            org.omg.CORBA.Object objRef =
                orb.resolve_initial_references("NameService");
            NamingContextExt ncRef =
                NamingContextExtHelper.narrow(objRef);
            Buffer buffer = BufferHelper.narrow(
                ncRef.resolve_str("Buffer"));

            boolean resultado = buffer.fijarLimiteNoticias(limite);

            if (resultado) {
                out.println("<h2>Límite establecido correctamente</h2>");
                out.println("<p>Nuevo límite máximo: <b>" +
                    limite + "</b> noticias</p>");
                out.println("<p>Noticias actuales en el buffer: <b>" +
                    buffer.getNewsLength() + "</b></p>");
            } else {
                out.println("<h2>Error al establecer el límite</h2>");
            }

        } catch (NumberFormatException e) {
            out.println("<h2>Error</h2>");
            out.println("<p>El límite debe ser un número entero</p>");
        } catch (Exception e) {
            out.println("<h2>Error de conexión con CORBA</h2>");
            out.println("<p>" + e.getMessage() + "</p>");
        }

        out.println("<br><a href='index.html'>Volver</a>");
        out.println("</body></html>");
    }
}