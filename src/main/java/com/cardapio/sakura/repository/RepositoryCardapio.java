package com.cardapio.sakura.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.cardapio.sakura.model.ModelCardapio;
@Repository
 
public interface RepositoryCardapio extends JpaRepository<ModelCardapio, Long> {
 
}