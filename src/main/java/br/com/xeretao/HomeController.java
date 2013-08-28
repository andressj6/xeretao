/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.xeretao;

import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;

/**
 *
 * @author Andre
 */
@Resource
@Path("/home")
public class HomeController {

    private Result result;

    public HomeController(Result result) {
        this.result = result;
    }

    @Path("/")
    public void index() {
        result.include("loggedIn", false);
        System.out.println("Vish");
    }

    @Path("/recomendacoes")
    public void recomendacoes() {
        
    }
}
