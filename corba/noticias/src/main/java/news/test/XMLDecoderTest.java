package news.test;

import news.xml.XMLCoder;
import news.xml.XMLDecoder;
import news.models.Noticia;

/**
 * Clase de prueba unitaria para XMLDecoder.
 * Comprueba que la decodificación de XML a noticia funciona correctamente.
 * @author chris
 * @version 1.0
 */

public class XMLDecoderTest {

    public static void main(String[] args) {

        System.out.println("=== TEST XMLDecoder ===");

        // Primero creamos un XML con XMLCoder
        String xml = XMLCoder.codificar(
            "16/03/2026",
            "media",
            "Escandalo en Londres",
            "Ha habido un gran escandalo en Londres esta semana",
            "#londres #escandalo"
        );

        System.out.println("XML generado: " + xml);

        // Ahora lo decodificamos con XMLDecoder
        Noticia noticia = XMLDecoder.decodificar(xml);

        if (noticia != null) {
            System.out.println("TEST OK - Noticia decodificada:");
            System.out.println("Fecha: "      + noticia.getFecha());
            System.out.println("Interes: "    + noticia.getInteres());
            System.out.println("DescCorta: "  + noticia.getDescCorta());
            System.out.println("DescLarga: "  + noticia.getDescLarga());
            System.out.println("Etiquetas: "  + noticia.getEtiquetas());
        } else {
            System.out.println("TEST FALLO - No se decodifico el XML");
        }
    }
}