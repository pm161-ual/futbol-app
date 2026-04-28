package news.test;

import news.xml.XMLCoder;

/**
 * Clase de prueba unitaria para XMLCoder.
 * Comprueba que la codificación de noticias a XML funciona correctamente.
 * @author chris
 * @version 1.0
 */

public class XMLCoderTest {

    public static void main(String[] args) {

        System.out.println("=== TEST XMLCoder ===");

        // Prueba 1: Noticia válida
        String xml = XMLCoder.codificar(
            "16/03/2026",
            "media",
            "Escandalo en Londres",
            "Ha habido un gran escandalo en Londres esta semana",
            "#londres #escandalo"
        );

        if (xml != null) {
            System.out.println("TEST 1 OK - XML generado:");
            System.out.println(xml);
        } else {
            System.out.println("TEST 1 FALLO - No se generó el XML");
        }

        // Prueba 2: Otra noticia
        String xml2 = XMLCoder.codificar(
            "17/03/2026",
            "alta",
            "Festival en Almeria",
            "Gran festival de musica en Almeria este fin de semana",
            "#festivalAlmeria #musica"
        );

        if (xml2 != null) {
            System.out.println("TEST 2 OK - XML generado:");
            System.out.println(xml2);
        } else {
            System.out.println("TEST 2 FALLO - No se generó el XML");
        }
    }
}