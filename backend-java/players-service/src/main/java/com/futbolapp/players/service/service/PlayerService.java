package com.futbolapp.players.service.service;

import com.futbolapp.players.service.model.Player;
import com.futbolapp.players.service.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAll() {
        return playerRepository.findAll();
    }

    public Optional<Player> getOne(Long id) {
        return playerRepository.findById(id);
    }

    public List<Player> search(String nombre, String equipo, String liga) {
        if (nombre != null) return playerRepository.findByNombreContainingIgnoreCase(nombre);
        if (equipo != null) return playerRepository.findByEquipoContainingIgnoreCase(equipo);
        if (liga != null) return playerRepository.findByLigaContainingIgnoreCase(liga);
        return playerRepository.findAll();
    }

    public Player create(Player player) {
        return playerRepository.save(player);
    }

    public Optional<Player> update(Long id, Player playerData) {
        return playerRepository.findById(id).map(player -> {
            player.setNombre(playerData.getNombre());
            player.setEquipo(playerData.getEquipo());
            player.setLiga(playerData.getLiga());
            player.setPosicion(playerData.getPosicion());
            player.setEdad(playerData.getEdad());
            player.setNacionalidad(playerData.getNacionalidad());
            player.setImagen(playerData.getImagen());
            return playerRepository.save(player);
        });
    }

    public boolean delete(Long id) {
        if (playerRepository.existsById(id)) {
            playerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}