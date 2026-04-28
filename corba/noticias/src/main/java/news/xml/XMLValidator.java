package news.xml;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.StringReader;

/**
 * Clase que valida la semántica de un documento XML contra un esquema XSD.
 * Comprueba si el XML cumple las reglas definidas en el esquema.
 * @author chris
 * @version 1.0
 */
public class XMLValidator {

    /**
     * Valida un documento XML contra un esquema XSD.
     * @param xml El documento XML como String
     * @param rutaXSD Ruta al archivo XSD con el esquema
     * @return true si el XML es válido, false en caso contrario
     */
    public static boolean validar(String xml, String rutaXSD) {
        try {
            SchemaFactory schemaFactory = SchemaFactory
                .newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = schemaFactory.newSchema(
                new StreamSource(rutaXSD)
            );
            Validator validator = schema.newValidator();
            validator.validate(
                new StreamSource(new StringReader(xml))
            );
            System.out.println("XML válido según el esquema XSD");
            return true;
        } catch (Exception e) {
            System.out.println("XML no válido: " + e.getMessage());
            return false;
        }
    }
}