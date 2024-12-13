package com.cardapio.sakura.service;
 
 
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.cardapio.sakura.model.ModelCardapio;
import com.cardapio.sakura.repository.RepositoryCardapio;
 
@Service
public class ServiceCardapio {
 
    private final RepositoryCardapio repositoryCardapio;
 
    public ServiceCardapio(RepositoryCardapio repositoryCardapio) {
        this.repositoryCardapio = repositoryCardapio;
    }
 
    public ModelCardapio adicionar(ModelCardapio cardapio) {
        return repositoryCardapio.save(cardapio);
    }
 
    public ModelCardapio buscarPorId(Long id) {
        return repositoryCardapio.findById(id).orElse(null);
    }
 
    public List<ModelCardapio> listar() {
        return repositoryCardapio.findAll();
    }
 
    public ModelCardapio atualizar(Long id, ModelCardapio cardapio) {
        ModelCardapio item = buscarPorId(id);
        if (item != null) {
            item.setNome(cardapio.getNome());
            item.setDescricao(cardapio.getDescricao());
            item.setPreco(cardapio.getPreco());
            item.setUrl(cardapio.getUrl());
            return repositoryCardapio.save(item);
        }
        return null;
    }
 
    public void deletar(Long id) {
        repositoryCardapio.deleteById(id);
    }
}