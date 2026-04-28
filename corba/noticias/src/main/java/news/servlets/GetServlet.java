package news.servlets;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;
import org.omg.CORBA.*;
import org.omg.CosNaming.*;
import org.omg.CosNaming.NamingContextPackage.*;
import BufferApp.*;
import news.xml.XMLDecoder;
import news.models.Noticia;

/**
 * Servlet que gestiona las operaciones GET y READ del Consumidor.
 * Conecta con el servidor CORBA y decodifica el XML recibido.
 * @author chris
 * @version 1.0
 */

public class GetServlet extends HttpServlet {

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
    throws IOException, ServletException {

        String accion = request.getParameter("accion");

        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();

        out.println("<html><head><meta charset='UTF-8'>");
        out.println("<title>Resultado</title></head><body>");

        try {
            // Conectamos con el servidor CORBA
            String[] args = {"-ORBInitialPort", "1050"};
            ORB orb = ORB.init(args, null);
            org.omg.CORBA.Object objRef =
                orb.resolve_initial_references("NameService");
            NamingContextExt ncRef =
                NamingContextExtHelper.narrow(objRef);
            Buffer buffer = BufferHelper.narrow(
                ncRef.resolve_str("Buffer"));

            StringHolder elemento = new StringHolder();
            boolean resultado = false;

            // Según la acción llamamos a get o read
            if (accion.equals("get")) {
                resultado = buffer.get(elemento);
            } else if (accion.equals("read")) {
                resultado = buffer.read(elemento);
            }

            if (resultado) {
                // Decodificamos el XML
                Noticia noticia = XMLDecoder.decodificar(elemento.value);

                if (accion.equals("get")) {
                    out.println("<h2>Noticia extraída del buffer</h2>");
                } else {
                    out.println("<h2>Noticia leída del buffer</h2>");
                }

                out.println("<p><b>Fecha:</b> " + 
                    noticia.getFecha() + "</p>");
                out.println("<p><b>Interés:</b> " + 
                    noticia.getInteres() + "</p>");
                out.println("<p><b>Desc. corta:</b> " + 
                    noticia.getDescCorta() + "</p>");
                out.println("<p><b>Desc. larga:</b> " + 
                    noticia.getDescLarga() + "</p>");
                out.println("<p><b>Etiquetas:</b> " + 
                    noticia.getEtiquetas() + "</p>");
            } else {
                out.println("<h2>No se pudo obtener la noticia</h2>");
                out.println("<p>El buffer está vacío o tiene " +
                    "menos de 3 elementos</p>");
            }

        } catch (Exception e) {
            out.println("<h2>Error de conexión con CORBA</h2>");
            out.println("<p>" + e.getMessage() + "</p>");
        }

        out.println("<br><a href='index.html'>Volver</a>");
        out.println("</body></html>");
    }
}