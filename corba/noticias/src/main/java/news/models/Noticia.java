package news.models;

/**
 * Clase que representa una noticia en el gestor de noticias.
 * Contiene los cinco campos obligatorios de cada noticia.
 * @author chris
 * @version 1.0
 */
public class Noticia {

    /** Fecha de creación de la noticia en formato dd/mm/aaaa */
    private String fecha;

    /** Nivel de interés de la noticia: alta, media o baja */
    private String interes;

    /** Descripción corta de la noticia (5-30 caracteres sin espacios) */
    private String descCorta;

    /** Descripción larga de la noticia (20-250 caracteres sin espacios) */
    private String descLarga;

    /** Etiquetas de la noticia en formato hashtag (1-6 etiquetas) */
    private String etiquetas;

    /**
     * Constructor que crea una noticia con todos sus campos.
     * @param fecha Fecha en formato dd/mm/aaaa
     * @param interes Nivel de interés: alta, media o baja
     * @param descCorta Descripción corta de la noticia
     * @param descLarga Descripción larga de la noticia
     * @param etiquetas Etiquetas en formato hashtag
     */
    public Noticia(String fecha, String interes,
                   String descCorta, String descLarga,
                   String etiquetas) {
        this.fecha     = fecha;
        this.interes   = interes;
        this.descCorta = descCorta;
        this.descLarga = descLarga;
        this.etiquetas = etiquetas;
    }

    /**
     * Obtiene la fecha de la noticia.
     * @return Fecha en formato dd/mm/aaaa
     */
    public String getFecha() { return fecha; }

    /**
     * Obtiene el nivel de interés de la noticia.
     * @return Nivel de interés: alta, media o baja
     */
    public String getInteres() { return interes; }

    /**
     * Obtiene la descripción corta de la noticia.
     * @return Descripción corta
     */
    public String getDescCorta() { return descCorta; }

    /**
     * Obtiene la descripción larga de la noticia.
     * @return Descripción larga
     */
    public String getDescLarga() { return descLarga; }

    /**
     * Obtiene las etiquetas de la noticia.
     * @return Etiquetas en formato hashtag
     */
    public String getEtiquetas() { return etiquetas; }

    /**
     * Establece la fecha de la noticia.
     * @param fecha Fecha en formato dd/mm/aaaa
     */
    public void setFecha(String fecha) { this.fecha = fecha; }

    /**
     * Establece el nivel de interés de la noticia.
     * @param interes Nivel de interés: alta, media o baja
     */
    public void setInteres(String interes) { this.interes = interes; }

    /**
     * Establece la descripción corta de la noticia.
     * @param descCorta Descripción corta
     */
    public void setDescCorta(String descCorta) { this.descCorta = descCorta; }

    /**
     * Establece la descripción larga de la noticia.
     * @param descLarga Descripción larga
     */
    public void setDescLarga(String descLarga) { this.descLarga = descLarga; }

    /**
     * Establece las etiquetas de la noticia.
     * @param etiquetas Etiquetas en formato hashtag
     */
    public void setEtiquetas(String etiquetas) { this.etiquetas = etiquetas; }
}