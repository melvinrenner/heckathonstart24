const config = require("../../config/general.config.js");
exports.mailPasswordReset = (url) => {
    return(
        `
        <html>        
        <head>        
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />        
            <title>Passwort vergessen</title>
            <style>
            .btn-ersiees {
                color: white;
                font-weight: bold;
                text-decoration: none;
                background-color: rgb(1,65,130);
                border-color: rgb(1,65,130);
                display: inline-block;
                font-weight: 400;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                border: 1px solid transparent;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: 500px;
                transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            }
            
            </style>
        </head>        
        <body style="background-color: #FFFFFF; padding: 0; margin: 2%;">
        <div  style="text-align: center">
            <img src="/images/logo.png">
        </div> 
        <table border="0" cellpadding="0" cellspacing="10" height="100%" bgcolor="#FFFFFF" width="100%" style="max-width: 650px;" id="bodyTable">        
            <tr>        
                <td align="center" valign="top">        
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">  
                        <tr>        
                            <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-bottom: 10px;"> 
                            </td>        
                        </tr>              
                        <tr>        
                            <td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding: 20px 0 10px 0;">        
                                <span style="font-size: 18px; font-weight: normal;">PASSWORT VERGESSEN</span>        
                            </td>        
                        </tr>              
                        <tr>        
                            <td align="left" valign="top" colspan="2" style="padding-top: 10px;">        
                                <span style="font-size: 12px; line-height: 1.5; color: #333333;">        
                                    Dies ist eine automatisch generierte E-mail, welche Ihnen im Zuge Ihrer Anrage gesendet wurde, um Ihr Passwort zurückzusetzen.
                                    Der angegebene Link hat eine Gültigkeit von 60 Minuten.
                                    <br/><br/>        
                                    Zum Zurücksetzten verwenden Sie bitte folgenden Link: 
                                    <br/><br/>  
                                    <div  style="text-align: center">        
                                        <a href="${url}" class="btn-ersiees">Reset Password</a>   
                                    </div>     
                                    <br/><br/>        
                                    Wir Empfehlen Ihnen, Ihr Passwort sicher aufzubewahren und niemandem mitzuteilen. Falls Sie denken, dass Ihr Passwort nicht mehr sicher ist, können Sie dieses jederzeit in ihren Accounteinstellungen ändern.        
                                    <br/><br/>        
                                    Falls Sie Hilfe benötigen oder sonstige Fragen haben, kontaktieren Sie uns gerne per <a href=${config.email}>E-Mail</a> oder per Telefon unter ${config.telefon}.        
                                    <br/><br/>
                                    Mit freundlichen Grüßen <br/>          
                                    Kundenservice <br/>     
                                    ER sie & es
                                </span>        
                            </td>        
                        </tr>        
                    </table>        
                </td>        
            </tr>        
        </table>            
        </body>        
        </html> 
        `
    )
}
        
