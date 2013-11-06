/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.xeretao.model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Andre
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    @Id
    private String id;
    private String name;
    private String email;
    private String picture_sq;
    private String favorites;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFavorites() {
        return favorites;
    }

    public void setFavorites(String favorites) {
        this.favorites = favorites;
    }

    public String getPicture_sq() {
        return picture_sq;
    }

    public void setPicture_sq(String picture_sq) {
        this.picture_sq = picture_sq;
    }
}
