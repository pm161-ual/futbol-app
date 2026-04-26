package com.futbolapp.players.service.repository;

import com.futbolapp.players.service.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByNombreContainingIgnoreCase(String nombre);
    List<Player> findByEquipoContainingIgnoreCase(String equipo);
    List<Player> findByLigaContainingIgnoreCase(String liga);
}