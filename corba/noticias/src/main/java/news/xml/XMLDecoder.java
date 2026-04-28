package news.xml;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import java.io.StringReader;
import org.xml.sax.InputSource;
import news.models.Noticia;

/**
 * Clase que decodifica un documento XML y extrae los campos de una noticia.
 * Implementa la funcionalidad de desempaquetamiento de datos.
 * @author chris
 * @version 1.0
 */
public class XMLDecoder {

    /**
     * Extrae los 5 campos de una noticia a partir de un documento XML.
     * @param xml El documento XML como String
     * @return Objeto Noticia con los campos extraídos, o null si hay error
     */
    public static Noticia decodificar(String xml) {
        try {
            DocumentBuilderFactory factory =
                DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.parse(
                new InputSource(new StringReader(xml))
            );
            doc.getDocumentElement().normalize();

            String fecha = doc.getElementsByTagName("fecha")
                .item(0).getTextContent();
            String interes = doc.getElementsByTagName("interes")
                .item(0).getTextContent();
            String descCorta = doc.getElementsByTagName("descCorta")
                .item(0).getTextContent();
            String descLarga = doc.getElementsByTagName("descLarga")
                .item(0).getTextContent();
            String etiquetas = doc.getElementsByTagName("etiquetas")
                .item(0).getTextContent();

            return new Noticia(fecha, interes,
                               descCorta, descLarga, etiquetas);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}