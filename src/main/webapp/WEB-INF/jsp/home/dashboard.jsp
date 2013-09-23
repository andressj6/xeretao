<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="../../includes/header.jsp" />
<h3> Dashboard (in progress)</h3>

<ul class="nav nav-tabs" id="myTabs">
    <li class="active"><a href="#search" data-toggle="tab">Busca</a></li>
    <li><a href="#topposts" data-toggle="tab">Trending</a></li>
</ul>

<div class="tab-content" style="margin-top: 10px;">

    <div class="tab-pane fade active in" id="search">
        <div class="input-group" style="margin-bottom: 10px;">
            <span class="input-group-addon">?</span>
            <input type="text" class="form-control" id="input-busca" placeholder="Buscar">
            <span class="input-group-btn">
                <button class="btn btn-info" id="btn-buscar" type="button">Vai!</button>
            </span>
        </div>
        <div class="col-md-6">
            <div class="panel panel-success " id="panel-resultados-posts">
                <div class="panel-heading">
                    <h3 class="panel-title">Resultados da Busca em Postagens</h3>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="panel panel-success " id="panel-resultados-comments">
                <div class="panel-heading">
                    <h3 class="panel-title">Resultados da Busca em Comentários</h3>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>
    </div>



    <div class="tab-pane fade" id="topposts">
        <div class="col-md-4">
            <div class="panel panel-success" id="panel-photos">
                <div class="panel-heading">
                    <h3 class="panel-title">Fotos mais Curtidas</h3>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="panel panel-success" id="panel-posts-like">
                <div class="panel-heading">
                    <h3 class="panel-title">Posts mais Curtidos</h3>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="panel panel-success" id="panel-posts-share">
                <div class="panel-heading">
                    <h3 class="panel-title">Posts mais Compartilhados</h3>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="panel panel-success" id="panel-tagcloud">
                <div class="panel-heading">
                    <h3 class="panel-title">Núvem de Tags</h3>
                </div>
                <div class="panel-body">

                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="../../includes/footer.jsp" />