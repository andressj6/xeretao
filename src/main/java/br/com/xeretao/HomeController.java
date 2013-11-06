/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.xeretao;

import br.com.caelum.vraptor.Consumes;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.xeretao.model.UserSession;
import br.com.xeretao.model.Usuario;

/**
 *
 * @author Andre
 */
@Resource
@Path("/home")
public class HomeController {

    private Result result;
    private UserSession session;

    public HomeController(Result result, UserSession session) {
        this.result = result;
        this.session = session;
    }

    @Path("/")
    public void index() {
        result.include("loggedIn", false);
        System.out.println("Vish");
    }

    @Post
    @Path("/login")
    @Consumes("application/json")
    public void login(Usuario usuario) {
        session.setUsuario(usuario);
        result.nothing();
    }

    @Path("/recomendacoes")
    public void recomendacoes() {
    }

    @Path("/dashboard")
    public void dashboard() {
        result.include("user", session.getUsuario());
    }

    @Path("/loadFavorites/{id}")
    public void loadFavorites(String id) {
        System.out.println("Teste");
    }

    @Path("/saveFavorites")
    public void saveFavorites(String id, String lista) {
        System.out.println("Salvou");
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public UserSession getSession() {
        return session;
    }

    public void setSession(UserSession session) {
        this.session = session;
    }
}
