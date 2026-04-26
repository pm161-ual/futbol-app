package com.futbolapp.comments.service.controller;

import com.futbolapp.comments.service.model.Comment;
import com.futbolapp.comments.service.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/player/{playerId}")
    public ResponseEntity<List<Comment>> getByPlayerId(@PathVariable Long playerId) {
        return ResponseEntity.ok(commentService.getByPlayerId(playerId));
    }

    @PostMapping
    public ResponseEntity<Comment> create(@RequestBody Comment comment) {
        return ResponseEntity.status(201).body(commentService.create(comment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (commentService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}