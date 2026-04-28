package news.buffer;

import BufferApp.*;
import org.omg.CORBA.*;

/**
 * Implementación del objeto CORBA que gestiona el buffer de noticias.
 * Sigue una política FIFO y controla el número máximo de noticias.
 * @author chris
 * @version 1.0
 */
public class BufferImpl extends BufferPOA {

    /** Array que almacena las noticias en formato XML */
    private String buf[];

    /** Número actual de elementos en el buffer */
    private int elementos;

    /** Número máximo de elementos permitidos en el buffer */
    private int maxElementos;

    /**
     * Constructor que inicializa el buffer con capacidad para 10 noticias.
     */
    public BufferImpl() {
        maxElementos = 10;
        buf = new String[maxElementos];
        elementos = 0;
    }

    /**
     * Inserta una noticia en el buffer.
     * Solo permite insertar si hay menos de maxElementos noticias.
     * @param elemento Noticia en formato XML
     * @return true si se insertó correctamente, false si el buffer está lleno
     */
    public boolean put(String elemento) {
        if (elementos < maxElementos) {
            buf[elementos] = elemento;
            elementos++;
            System.out.println("PUT OK - Elementos: " + elementos);
            return true;
        } else {
            System.out.println("BUFFER LLENO");
            return false;
        }
    }

    /**
     * Extrae la primera noticia del buffer siguiendo política FIFO.
     * Solo permite extraer si hay 3 o más noticias.
     * @param elemento Contenedor donde se almacena la noticia extraída
     * @return true si se extrajo correctamente, false si hay menos de 3 elementos
     */
    public boolean get(StringHolder elemento) {
        if (elementos >= 3) {
            elemento.value = buf[0];
            for (int i = 0; i < elementos - 1; i++) {
                buf[i] = buf[i + 1];
            }
            elementos--;
            System.out.println("GET OK - Elementos: " + elementos);
            return true;
        } else {
            elemento.value = "BUFFER VACIO O MENOS DE 3 ELEMENTOS";
            return false;
        }
    }

    /**
     * Lee la primera noticia del buffer sin extraerla.
     * Solo permite leer si hay 3 o más noticias.
     * @param elemento Contenedor donde se almacena la noticia leída
     * @return true si se leyó correctamente, false si hay menos de 3 elementos
     */
    public boolean read(StringHolder elemento) {
        if (elementos >= 3) {
            elemento.value = buf[0];
            System.out.println("READ OK");
            return true;
        } else {
            elemento.value = "BUFFER VACIO O MENOS DE 3 ELEMENTOS";
            return false;
        }
    }

    /**
     * Obtiene el número actual de noticias en el buffer.
     * @return Número de noticias en el buffer
     */
    public int getNewsLength() {
        return elementos;
    }

    /**
     * Obtiene el límite máximo de noticias del buffer.
     * @return Límite máximo de noticias
     */
    public int getMaxNews() {
        return maxElementos;
    }

    /**
     * Establece el número máximo de noticias permitido en el buffer.
     * Si el nuevo límite es menor que el número actual de noticias,
     * se eliminan las últimas noticias hasta ajustarse al nuevo límite.
     * @param numeroMaximo Nuevo límite máximo de noticias
     * @return true si se estableció correctamente
     */
    public boolean fijarLimiteNoticias(int numeroMaximo) {
        if (numeroMaximo < elementos) {
            elementos = numeroMaximo;
        }
        maxElementos = numeroMaximo;
        buf = new String[maxElementos];
        System.out.println("Nuevo límite: " + maxElementos);
        return true;
    }

    /**
     * Apaga el servidor CORBA.
     */
    public void shutdown() {
        System.out.println("Servidor apagado");
    }
}