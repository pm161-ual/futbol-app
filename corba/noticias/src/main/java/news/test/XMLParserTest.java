package news.test;

import news.xml.XMLParser;
import news.xml.XMLCoder;

/**
 * Clase de prueba unitaria para XMLParser.
 * Comprueba que la validación sintáctica de XML funciona correctamente.
 * @author chris
 * @version 1.0
 */

public class XMLParserTest {

    public static void main(String[] args) {

        System.out.println("=== TEST XMLParser ===");

        // Prueba 1: XML bien formado
        String xmlBueno = XMLCoder.codificar(
            "16/03/2026",
            "media",
            "Escandalo en Londres",
            "Ha habido un gran escandalo en Londres esta semana",
            "#londres #escandalo"
        );

        boolean resultado1 = XMLParser.esValido(xmlBueno);
        System.out.println("TEST 1 (XML correcto): " + 
            (resultado1 ? "OK - XML bien formado" : "FALLO"));

        // Prueba 2: XML mal formado
        String xmlMalo = "<noticia><fecha>16/03/2026</fecha>" +
                         "<interes>media" +
                         "</noticia>";

        boolean resultado2 = XMLParser.esValido(xmlMalo);
        System.out.println("TEST 2 (XML incorrecto): " + 
            (!resultado2 ? "OK - XML mal formado detectado" : "FALLO"));
    }
}