package news.xml;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import org.xml.sax.InputSource;

/**
 * Clase que valida la sintaxis de un documento XML.
 * Comprueba si el XML está bien formado.
 * @author chris
 * @version 1.0
 */
public class XMLParser {

    /**
     * Comprueba si un documento XML está bien formado sintácticamente.
     * @param xml El documento XML como String
     * @return true si el XML está bien formado, false en caso contrario
     */
    public static boolean esValido(String xml) {
        try {
            DocumentBuilderFactory factory =
                DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            builder.parse(new InputSource(new StringReader(xml)));
            System.out.println("XML bien formado");
            return true;
        } catch (Exception e) {
            System.out.println("XML mal formado: " + e.getMessage());
            return false;
        }
    }
}