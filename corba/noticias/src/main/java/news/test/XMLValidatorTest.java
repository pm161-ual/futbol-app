package news.test;

import news.xml.XMLCoder;
import news.xml.XMLValidator;

/**
 * Clase de prueba unitaria para XMLValidator.
 * Comprueba que la validación semántica de XML funciona correctamente.
 * @author chris
 * @version 1.0
 */

public class XMLValidatorTest {

    public static void main(String[] args) {

        System.out.println("=== TEST XMLValidator ===");

        // Ruta del archivo XSD
        String rutaXSD = "src/main/noticias.xsd";

        // Prueba 1: Noticia válida
        String xmlValido = XMLCoder.codificar(
            "16/03/2026",
            "media",
            "Escandalo Londres",
            "Ha habido un gran escandalo en Londres esta semana",
            "#londres #escandalo"
        );

        boolean resultado1 = XMLValidator.validar(xmlValido, rutaXSD);
        System.out.println("TEST 1 (XML valido): " +
            (resultado1 ? "OK - XML válido" : "FALLO"));

        // Prueba 2: Noticia con interés incorrecto
        String xmlInvalido = XMLCoder.codificar(
            "16/03/2026",
            "muyalta",
            "Escandalo Londres",
            "Ha habido un gran escandalo en Londres esta semana",
            "#londres #escandalo"
        );

        boolean resultado2 = XMLValidator.validar(xmlInvalido, rutaXSD);
        System.out.println("TEST 2 (XML invalido): " +
            (!resultado2 ? "OK - XML inválido detectado" : "FALLO"));
    }
}