<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="../../includes/header.jsp" />
<script type="text/javascript">
    $(document).ready(function() {
        $(".user-avatar").tooltip();
        $('#modal-preload').on('shown.bs.modal', function() {
            setTimeout(function() {
                fotosMaisCurtidas();
                postsMaisCurtidos();
                postsMaisCompartilhados();
                gerarListaFavoritos();
                $('#modal-preload').modal('hide');
            }, 5000);
        }).modal('show');

        $("#btn-buscar").click(function() {
            var key = $("#input-busca").val();
            if (key != "") {
                buscarPalavraChave(key);
            }
        });
    });
</script>
<div class="well well-sm">
    <div class="user-info">
        <div class="user-avatar" data-toggle="tooltip" data-placement="right" data-trigger="hover" title="${user.name}" style="float: left;">
            <img src="${user.picture_sq}"/>
        </div>
        <div class="input-group input-group-lg">
            <span class="input-group-addon">?</span>
            <input type="text" class="form-control input-lg" id="input-busca" placeholder="Pesquisar">
            <span class="input-group-btn">
                <button class="btn btn-info" id="btn-buscar" id="btn-buscar" type="button">&gt;</button>
            </span>
        </div>
    </div>
</div>
<div id="topposts">
    <div class="scroll-content">
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">Postagens dos Favoritos <a href="#" class="btn btn-default btn-sm" onclick="$('#modal-favoritos').modal('show');"><span class="glyphicon glyphicon-edit" /></a></div>
            <div class="panel-content" id="panel-posts-favoritos">
                <div class="list-group">
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">Fotos Mais Curtidas</div>
            <div class="panel-content" id="panel-curtidas-fotos">
                <div class="list-group">
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">Posts mais Populares.</div>
            <div class="panel-content" id="panel-curtidas-posts">
                <div class="list-group">

                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">Posts mais Compartilhados</div>
            <div class="panel-content" id="panel-shares-posts">
                <div class="list-group">
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">Resultados da Busca</div>
            <div class="panel-content" id="panel-busca-posts">
                <div class="list-group">
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-preload">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <p>Aguarde enquanto carregamos suas informações</p>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="modal-post">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Informações sobre a Postagem</h4>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<style type="text/css">
    #modal-favoritos .checkbox {
        height: 100px;
    }
</style>
<div class="modal fade" id="modal-favoritos">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Adicionar amigos aos Favoritos</h4>
            </div>
            <div class="modal-body" style="overflow-y: scroll; height: 300px;">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->



<jsp:include page="../../includes/footer.jsp" />