package com.futbolapp.players.service.controller;

import com.futbolapp.players.service.model.Player;
import com.futbolapp.players.service.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/external")
@CrossOrigin(origins = "*")
public class ExternalController {

    @Value("${api-football.key}")
    private String apiKey;

    @Autowired
    private PlayerService playerService;

    @GetMapping("/search")
    public ResponseEntity<?> searchPlayers(
            @RequestParam String nombre,
            @RequestParam(defaultValue = "140") String league,
            @RequestParam(defaultValue = "2023") String season) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-apisports-key", apiKey);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            String url = "https://v3.football.api-sports.io/players?search=" 
                + nombre + "&league=" + league + "&season=" + season;

            ResponseEntity<Map> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, Map.class);

            List<Map> apiPlayers = (List<Map>) response.getBody().get("response");
            List<Map<String, Object>> players = new ArrayList<>();

            for (Map item : apiPlayers) {
                Map<String, Object> player = new java.util.HashMap<>();
                Map p = (Map) item.get("player");
                List<Map> stats = (List<Map>) item.get("statistics");
                Map stat = stats.get(0);
                Map team = (Map) stat.get("team");
                Map leagueInfo = (Map) stat.get("league");
                Map games = (Map) stat.get("games");

                player.put("apiId", p.get("id"));
                player.put("nombre", p.get("name"));
                player.put("edad", p.get("age"));
                player.put("nacionalidad", p.get("nationality"));
                player.put("imagen", p.get("photo"));
                player.put("equipo", team.get("name"));
                player.put("liga", leagueInfo.get("name"));
                player.put("posicion", games.get("position"));
                players.add(player);
            }

            return ResponseEntity.ok(players);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/import")
    public ResponseEntity<?> importPlayers(@RequestBody Map<String, Object> body) {
        try {
            List<Map<String, Object>> jugadores = 
                (List<Map<String, Object>>) body.get("jugadores");
            List<Player> saved = new ArrayList<>();

            for (Map<String, Object> j : jugadores) {
                Player player = new Player();
                player.setNombre((String) j.get("nombre"));
                player.setEquipo((String) j.get("equipo"));
                player.setLiga((String) j.get("liga"));
                player.setPosicion((String) j.get("posicion"));
                player.setEdad((Integer) j.get("edad"));
                player.setNacionalidad((String) j.get("nacionalidad"));
                player.setImagen((String) j.get("imagen"));
                if (j.get("apiId") != null) {
                    player.setApiId(((Number) j.get("apiId")).intValue());
                }
                saved.add(playerService.create(player));
            }

            return ResponseEntity.status(201).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}