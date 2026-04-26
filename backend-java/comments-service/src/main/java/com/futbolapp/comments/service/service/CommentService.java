package com.futbolapp.comments.service.service;

import com.futbolapp.comments.service.model.Comment;
import com.futbolapp.comments.service.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getByPlayerId(Long playerId) {
        return commentRepository.findByPlayerId(playerId);
    }

    public Comment create(Comment comment) {
        return commentRepository.save(comment);
    }

    public boolean delete(Long id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}