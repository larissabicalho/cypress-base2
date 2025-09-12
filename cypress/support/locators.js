const locators = {
    LOGIN: {
        USER: '#username',
        PASSWORD: '#password',
        BTN_LOGIN: '.width-40'
    },
    PROJETOS: {
        PROJETO:'[href="/manage_proj_page.php"]',
        CRIARPROJETO:'.widget-toolbox > .form-inline > fieldset > .btn',
        NOMEPROJETO:'#project-name',
        BUTTONCRIARPROJETO:'.widget-toolbox > .btn'
    },
    TAREFAS:{
        VERTAREFA:'[href="/view_all_bug_page.php"] > .menu-text',
        CRIARTAREFA: '[href="bug_report_page.php"]',
        RESUMO: '#summary',
        DESCRICAO: '#description',
        CRIARBUTTON: '.widget-toolbox > .btn',
        VERIFICARISSUE: '.bug-header-data > .bug-id',
        MINHAVISAO: '[href="/my_view_page.php"] > .menu-text',
        CONFERIRISSUE: '.bug-header-data > .bug-id',
        COPIARISSUE:':nth-child(6) > .form-inline > fieldset > .btn',
        SELECIONARRESOLVIDO:':nth-child(3) > .form-inline > .input-sm',
        ALTERARSTATUS:':nth-child(3) > .form-inline > .btn',
        RESOLVERTAREFAS:'.widget-toolbox > .btn',
        STATUS:'td.bug-status',
        PREENCHERRELACOES: '.widget-toolbox > .form-inline > input.input-sm',
        ADICIONARELACAO:'.widget-toolbox > .form-inline > .btn',
        ATRIBUIRUSUARIO: '.btn-group > :nth-child(2) > .form-inline > .input-sm',
        ATRIBUIR:'.btn-group > :nth-child(2) > .form-inline > .btn',
        VERIFICAATRIBUIR: ':nth-child(6) > .widget-box > .widget-body > .widget-main > .table-responsive > .table > tbody > :nth-child(1) > :nth-child(4)',
        PREENCHERANOTACAO: '#bugnote_text',
        ADICIONARANOTACAO: '.widget-toolbox > .btn',
        BUGNOTE:'.bugnote-note',
        CONFIRMOAPAGAR: '.center > .btn',
        ATUALIZAR:'input.btn',
        PREENCHERMARCADOR: '#tag_string',
        APLICAR:'td.bug-attach-tags > .form-inline > .btn',
        APAGAR: ':nth-child(10) > .form-inline > fieldset > .btn',
        APAGARTAREFAS:'.widget-toolbox > .btn',
        MONITORAR:'#user_monitor_filter',
        MONITORAREU:'#user_monitor_filter_target > .input-xs',
        CLICOAPLICAR:'.btn-toolbar > .form-inline > .btn',
        REDEFINIR:'.btn-group > [href="view_all_set.php?type=0"]',
        RELACIONADOS:'#show_status_filter',
        CLICORELACIONADOS:'#show_status_filter_target > .input-xs',
        PRIORIDADECLICK:'#show_priority_filter',
        PRIORIDADEURGENTE:'#show_priority_filter_target > .input-xs',
        SELECIONARFECHAR:'select.input-sm',
        CLICAROK:'.widget-toolbox > .form-inline > .btn',
        FECHARTAREFA:'.widget-toolbox > .btn',
        CLICARESTADO:'#show_status_filter',
        FECHADO:'#show_status_filter_target > .input-xs',
        ATUALIZARISSUE:'.widget-toolbox > .btn',
        DESCRIPTIONTEXTO:'td.bug-description',
        },

        MARCADORES: {
         VERMARCADORES:'[href="/manage_tags_page.php"]',
         NOMEMARCADORES:'#tag-name',
         DESCRICAOMARCADORES:'#tag-description',
         BUTTONMARCADORES:'#manage-tags-create-form > .widget-box > .widget-body > .widget-toolbox > .btn',
         APAGARMARCADOR:'[action="tag_delete.php"] > fieldset > .btn',
         CONFIRMARAPAGARMARCADOR:'.center > .btn',
        },

        GERENCIAR:{
            GERENCIARSISTEMA:'[href="/manage_overview_page.php"] > .menu-text',
        },

        PERFILGLOBAIS: {
           CLICARPERFILGLOBAL:'[href="/manage_prof_menu_page.php"]',
           PLATAFORM:'#platform',
           SO:'#os',
           VERSAOSO:'#os-version',
           DESCRICAO:'#description',
           ADICIONARPERFISGLOBAIS:'.widget-toolbox > .btn',
           SELECTPLATAFORM:'#select-profile'
        },
        
        CATEGORIA:{
          PREENCHERCATEGORIA:'.input-sm',
          CLICARCATEGORIA:'[value="Adicionar Categoria"]',
          APAGARCATEGORIA:'.center > .btn',
          ALTERARCATEGORIA:'#proj-category-name',
          ATUALIZOCATEGORIA:'.widget-toolbox > .btn'
        },

        USUARIOS:{
            CRIARUSUARIO:'[href="/manage_user_page.php"]',
            CLICARCONTA:'.pull-left > .btn',
            PREENCHERNOME:'#user-username',
            PREENCHERREALNAME:'#user-realname',
            PREENCHEREMAIL:'#email-field',
            BUTTONCRIAR:'.widget-toolbox > .btn',
            MESSAGEERROR:'.bold'
        },
        
        MAIN:{
           ATRIBUIDOS:'#assigned > .widget-header > .widget-title > .white',
           NAOATRIBUIDOS:'#unassigned > .widget-header > .widget-title > .white',
           RELATADAS:'#reported > .widget-header > .widget-title > .white',
           RESOLVIDOS:'#resolved > .widget-header > .widget-title > .white',
           MONITORADOS:'#monitored > .widget-header > .widget-title > .white',
           RECENTES:'#recent_mod > .widget-header > .widget-title > .white'
        },

        LOGOUT:{
            CLICARCONTA:':nth-child(3) > .dropdown-toggle',
            SAIR:'[href="/logout_page.php"]'
        },

        RESET:{
            ESQUECISENHA:'a.pull-right',
            PREENCHEREMAIL:'#email-field',
            ENVIAR:'.width-40'

        },

        RESUMO:{
           CLICORESUMO:'[href="/summary_page.php"] > .menu-text',
           VERIFICARTEXTO:'.widget-title'
        },
        
        SELECIONARPROJETO:{
            CLICARTODOSPROJETOS:'#dropdown_projects_menu > .dropdown-toggle'
        }, 
        
        VERTAREFAS: {
            VEREXCEL:'[href="excel_xml_export.php"]',
            VERCSV:'[href="csv_export.php"]',
            IMPRIMIR:'[href="print_all_bug_page.php"]',
            WORD:'[href="print_all_bug_page_word.php?search=&sort=last_updated&dir=ASC&type_page=word&export=-1&show_flag=0"] > .fa'
        }
}

export default locators;