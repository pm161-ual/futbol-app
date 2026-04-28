package news.xml;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import java.io.StringWriter;

/**
 * Clase que codifica los campos de una noticia en un documento XML.
 * Implementa la funcionalidad de empaquetamiento de datos.
 * @author chris
 * @version 1.0
 */
public class XMLCoder {

    /**
     * Convierte los 5 campos de una noticia en un documento XML.
     * @param fecha Fecha de la noticia en formato dd/mm/aaaa
     * @param interes Nivel de interés: alta, media o baja
     * @param descCorta Descripción corta de la noticia
     * @param descLarga Descripción larga de la noticia
     * @param etiquetas Etiquetas en formato hashtag
     * @return El documento XML como String, o null si hay error
     */
    public static String codificar(String fecha, String interes,
                                   String descCorta, String descLarga,
                                   String etiquetas) {
        try {
            DocumentBuilderFactory factory =
                DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document doc = builder.newDocument();

            Element raiz = doc.createElement("noticia");
            doc.appendChild(raiz);

            Element eFecha = doc.createElement("fecha");
            eFecha.appendChild(doc.createTextNode(fecha));
            raiz.appendChild(eFecha);

            Element eInteres = doc.createElement("interes");
            eInteres.appendChild(doc.createTextNode(interes));
            raiz.appendChild(eInteres);

            Element eDescCorta = doc.createElement("descCorta");
            eDescCorta.appendChild(doc.createTextNode(descCorta));
            raiz.appendChild(eDescCorta);

            Element eDescLarga = doc.createElement("descLarga");
            eDescLarga.appendChild(doc.createTextNode(descLarga));
            raiz.appendChild(eDescLarga);

            Element eEtiquetas = doc.createElement("etiquetas");
            eEtiquetas.appendChild(doc.createTextNode(etiquetas));
            raiz.appendChild(eEtiquetas);

            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer transformer = tf.newTransformer();
            StringWriter writer = new StringWriter();
            transformer.transform(new DOMSource(doc),
                                  new StreamResult(writer));

            return writer.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}