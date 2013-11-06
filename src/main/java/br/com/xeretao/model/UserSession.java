/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.xeretao.model;

import br.com.caelum.vraptor.ioc.Component;
import br.com.caelum.vraptor.ioc.SessionScoped;

/**
 *
 * @author Andre
 */
@Component
@SessionScoped
public class UserSession {

    private Usuario usuario;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
