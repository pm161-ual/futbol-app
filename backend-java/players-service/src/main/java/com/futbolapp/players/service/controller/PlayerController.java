package com.futbolapp.players.service.controller;


import com.futbolapp.players.service.model.Player;
import com.futbolapp.players.service.service.PlayerService;
import com.futbolapp.players.service.client.CommentClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private CommentClient commentClient;

    @GetMapping
    public ResponseEntity<List<Player>> getAll(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String equipo,
            @RequestParam(required = false) String liga) {
        return ResponseEntity.ok(playerService.search(nombre, equipo, liga));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        return playerService.getOne(id).map(player -> {
            Map<String, Object> response = new HashMap<>();
            response.put("player", player);
            response.put("comments", commentClient.getCommentsByPlayerId(id));
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Player> create(@RequestBody Player player) {
        return ResponseEntity.status(201).body(playerService.create(player));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Player player) {
        return playerService.update(id, player)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (playerService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}