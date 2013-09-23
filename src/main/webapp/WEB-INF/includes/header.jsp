<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Xeretão!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/xeretao/js/jquery.js"></script>
        <script src="http://localhost:8080/xeretao/js/bootstrap.min.js"></script>
        <script src="http://localhost:8080/xeretao/js/jqcloud.js"></script>
        <script src="http://localhost:8080/xeretao/js/lawnchair-0.6.1.min.js"></script>
        <script src="http://localhost:8080/xeretao/js/lawnchair-adapter-indexed-db-0.6.1.js"></script>
        <link href="http://localhost:8080/xeretao/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="http://localhost:8080/xeretao/css/layout.css" rel="stylesheet" media="screen">
        <link href="http://localhost:8080/xeretao/css/jqcloud.css" rel="stylesheet" media="screen">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="../../assets/js/html5shiv.js"></script>
          <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div id="fb-root"></div>
        <script type="text/javascript" src="/xeretao/js/fbengine.js"></script>
        <header class="navbar navbar-default" role="navigation">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Xeretão</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                    <li><a href="#">Recomendações <span class="badge">23</span></a></li>
                    <li><a href="#">Favoritos <span class="badge">23</span></a></li>
                    <li><a href="#">Xeretar <span class="badge">23</span></a></li>
                    <li><a href="#">Trending <span class="badge">23</span></a></li>
                    <li><a href="#">Comportamento <span class="badge">23</span></a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </header>

        <div class="container" style="margin-left: auto; margin-right: auto;">