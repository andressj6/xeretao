<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="../../includes/header.jsp" />
<script type="text/javascript">
    var infos = ["photos", "posts-like", "posts-share"];
</script>
<h3> Dashboard (in progress)</h3>
<div class="panel panel-success" id="panel-photos">
    <div class="panel-heading">
        <h3 class="panel-title">Fotos mais Curtidas</h3>
    </div>
    <div class="panel-body">

    </div>
</div>
<div class="panel panel-success" id="panel-posts-like">
    <div class="panel-heading">
        <h3 class="panel-title">Posts mais Curtidos</h3>
    </div>
    <div class="panel-body">

    </div>
</div>
<div class="panel panel-success" id="panel-posts-share">
    <div class="panel-heading">
        <h3 class="panel-title">Posts mais Compartilhados</h3>
    </div>
    <div class="panel-body">

    </div>
</div>
<jsp:include page="../../includes/footer.jsp" />