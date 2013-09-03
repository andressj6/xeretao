<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="../../includes/header.jsp" />
<script type="text/javascript">
    $(document).ready(function() {
        $("#btn-buscar").click(function() {
            buscarPalavraChave($("#input-busca").val(), $("#panel-resultados .panel-body"));
            $("#btn-buscar").attr("disabled","disabled");
        });
    });
</script>
<div class="input-group">
    <span class="input-group-addon">?</span>
    <input type="text" class="form-control" id="input-busca" placeholder="Buscar">
    <span class="input-group-btn">
        <button class="btn btn-info" id="btn-buscar" type="button">Vai!</button>
    </span>
</div>
<div class="panel panel-default" id="panel-resultados">
    <div class="panel-heading">
        <h3 class="panel-title">Resultados da Busca</h3>
    </div>
    <div class="panel-body">

    </div>
</div>
<jsp:include page="../../includes/footer.jsp" />