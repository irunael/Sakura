package com.cardapio.sakura.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardapio.sakura.model.ModelCardapio;
import com.cardapio.sakura.service.ServiceCardapio;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cardapio")
public class ControllerCardapio {

    @Autowired
    private ServiceCardapio cardapioService;

    @GetMapping
    public List<ModelCardapio> listarTodos() {
        return cardapioService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModelCardapio> buscarPorId(@PathVariable Long id) {
        ModelCardapio alimento = cardapioService.buscarPorId(id);
        if (alimento != null) {
            return ResponseEntity.ok(alimento);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<ModelCardapio> salvarCardapio(@RequestBody ModelCardapio cardapio) {
        ModelCardapio novoCardapio = cardapioService.adicionar(cardapio);
        return ResponseEntity.status(201).body(novoCardapio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModelCardapio> atualizarCardapio(@PathVariable Long id, @RequestBody ModelCardapio cardapio) {
        ModelCardapio cardapioAtualizado = cardapioService.atualizar(id, cardapio);
        if (cardapioAtualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cardapioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCardapio(@PathVariable Long id) {
        ModelCardapio cardapio = cardapioService.buscarPorId(id);
        if (cardapio == null) {
            return ResponseEntity.notFound().build();
        }
        cardapioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
