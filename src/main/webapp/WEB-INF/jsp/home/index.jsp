<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Xeretão!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/xeretao/js/jquery.js"></script>
        <script src="http://localhost:8080/xeretao/js/bootstrap.min.js"></script>
        <link href="http://localhost:8080/xeretao/css/bootstrap.min.css" rel="stylesheet" media="screen">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="../../assets/js/html5shiv.js"></script>
          <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->

        <script type="text/javascript">
            $(document).ready(function() {
                $("#btn_login").click(function() {
                    return checkLogin(function() {
                        window.location = "/xeretao/home/dashboard";
                    });
                });
            });
        </script>
    </head>
    <body>
        <div id="fb-root"></div>
        <script type="text/javascript" src="/xeretao/js/fbengine.js"></script>
        <header class="navbar navbar-default" role="navigation">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Xeretão</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/xeretao/home/">Home</a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </header>
        <div class="jumbotron">
            <div class="container">
                <h1>Bem Vindo ao Xeretão!</h1>
                <p>Utilize o Facebook de maneira MUITO mais eficiente! Menos Zoeira, mais conteúdo interessante!</p>
                <p><a class="btn btn-primary btn-lg" id="btn_login">Entrar com o Facebook!</a></p>
            </div>
        </div>

        <footer class="bs-masthead-links">
            <ul style="list-style: none; display: inline-table">
                <li>Copyright - 2013 - André Lima (<a href="mailto:andressj6@gmail.com">andressj6(at)gmail(dot)com</a>)</li>
            </ul>
        </footer>
    </body>
</html>
