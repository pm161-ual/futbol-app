package news.buffer;

import BufferApp.*;
import org.omg.CosNaming.*;
import org.omg.CosNaming.NamingContextPackage.*;
import org.omg.CORBA.*;
import org.omg.PortableServer.*;

/**
 * Clase principal del servidor CORBA que gestiona el buffer de noticias.
 * Registra el objeto Buffer en el servicio de nombres y espera peticiones.
 * @author chris
 * @version 1.0
 */
public class BufferServer {

    /**
     * Método principal que arranca el servidor CORBA.
     * Inicializa el ORB, registra el objeto Buffer y espera peticiones.
     * @param args Argumentos de línea de comandos (ORBInitialPort)
     */
    public static void main(String args[]) {
        try {
            // Crea e inicializa el ORB
            ORB orb = ORB.init(args, null);

            // Obtiene referencia al POA
            POA rootpoa = POAHelper.narrow(
                orb.resolve_initial_references("RootPOA"));
            rootpoa.the_POAManager().activate();

            // Crea el objeto BufferImpl
            BufferImpl bufferImpl = new BufferImpl();

            // Obtiene referencia al objeto
            org.omg.CORBA.Object ref =
                rootpoa.servant_to_reference(bufferImpl);
            Buffer href = BufferHelper.narrow(ref);

            // Registra el objeto en el servicio de nombres
            org.omg.CORBA.Object objRef =
                orb.resolve_initial_references("NameService");
            NamingContextExt ncRef =
                NamingContextExtHelper.narrow(objRef);

            String name = "Buffer";
            NameComponent path[] = ncRef.to_name(name);
            ncRef.rebind(path, href);

            System.out.println("Servidor Buffer preparado y esperando...");

            // Espera peticiones de clientes
            orb.run();

        } catch (Exception e) {
            System.err.println("ERROR: " + e);
            e.printStackTrace();
        }
    }
}