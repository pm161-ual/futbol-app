package news.servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import org.omg.CORBA.*;
import org.omg.CosNaming.*;
import org.omg.CosNaming.NamingContextPackage.*;
import BufferApp.*;
import news.xml.XMLCoder;
import news.xml.XMLParser;
import news.xml.XMLValidator;

/**
 * Servlet que recibe los datos del formulario HTML del Productor.
 * Valida los campos, genera un XML y lo envía al servidor CORBA.
 * @author chris
 * @version 1.0
 */

public class PutServlet extends HttpServlet {

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response)
    throws IOException, ServletException {

        // Recogemos los 5 campos del formulario
        String fecha     = request.getParameter("fecha");
        String interes   = request.getParameter("interes");
        String descCorta = request.getParameter("descCorta");
        String descLarga = request.getParameter("descLarga");
        String etiquetas = request.getParameter("etiquetas");

        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();

        out.println("<html><head><meta charset='UTF-8'>");
        out.println("<title>Resultado</title></head><body>");

        // Validamos los campos
        String error = validar(fecha, interes, descCorta, 
                               descLarga, etiquetas);
        if (error != null) {
            out.println("<h2>Error de validación</h2>");
            out.println("<p>" + error + "</p>");
            out.println("<br><a href='index.html'>Volver</a>");
            out.println("</body></html>");
            return;
        }

        // Creamos el XML
        String xml = XMLCoder.codificar(fecha, interes, 
                                        descCorta, descLarga, 
                                        etiquetas);

        // Validamos el XML
        if (!XMLParser.esValido(xml)) {
            out.println("<h2>Error</h2>");
            out.println("<p>El XML generado no es válido</p>");
            out.println("<br><a href='index.html'>Volver</a>");
            out.println("</body></html>");
            return;
        }

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

            // Enviamos el XML al buffer
            boolean resultado = buffer.put(xml);

            if (resultado) {
                out.println("<h2>Noticia insertada correctamente</h2>");
                out.println("<p><b>Fecha:</b> " + fecha + "</p>");
                out.println("<p><b>Interés:</b> " + interes + "</p>");
                out.println("<p><b>Desc. corta:</b> " + descCorta + "</p>");
                out.println("<p><b>Desc. larga:</b> " + descLarga + "</p>");
                out.println("<p><b>Etiquetas:</b> " + etiquetas + "</p>");
            } else {
                out.println("<h2>Error: Buffer lleno</h2>");
                out.println("<p>No se pudo insertar la noticia</p>");
            }

        } catch (Exception e) {
            out.println("<h2>Error de conexión con CORBA</h2>");
            out.println("<p>" + e.getMessage() + "</p>");
        }

        out.println("<br><a href='index.html'>Volver</a>");
        out.println("</body></html>");
    }

    // Método de validación de los campos
    private String validar(String fecha, String interes, 
                           String descCorta, String descLarga, 
                           String etiquetas) {

        // Validar fecha formato dd/mm/aaaa
        if (!fecha.matches("\\d{2}/\\d{2}/\\d{4}")) {
            return "La fecha debe tener formato dd/mm/aaaa";
        }

        // Validar interés
        if (!interes.equals("alta") && !interes.equals("media") 
            && !interes.equals("baja")) {
            return "El interés debe ser alta, media o baja";
        }

        // Validar descripción corta (5-30 sin espacios)
        String descCortaSinEspacios = descCorta.replace(" ", "");
        if (descCortaSinEspacios.length() < 5 || 
            descCortaSinEspacios.length() > 30) {
            return "La descripción corta debe tener entre 5 y 30 caracteres sin espacios";
        }

        // Validar descripción larga (20-250 sin espacios)
        String descLargaSinEspacios = descLarga.replace(" ", "");
        if (descLargaSinEspacios.length() < 20 || 
            descLargaSinEspacios.length() > 250) {
            return "La descripción larga debe tener entre 20 y 250 caracteres sin espacios";
        }

        // Validar etiquetas (1-6 hashtags)
        String[] tags = etiquetas.trim().split("\\s+");
        if (tags.length < 1 || tags.length > 6) {
            return "Debe haber entre 1 y 6 etiquetas";
        }
        for (String tag : tags) {
            if (!tag.startsWith("#")) {
                return "Cada etiqueta debe empezar por #";
            }
        }

        return null; // Todo correcto
    }
}