package com.futbolapp.comments.service.repository;

import com.futbolapp.comments.service.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPlayerId(Long playerId);
}