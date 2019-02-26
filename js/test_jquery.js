$(function(){
  // 「.modal-open」をクリック、背景半透明
  $('.modal-open').click(function(){
    // オーバーレイ用の要素を追加
    $('body').append('<div class="modal-overlay"></div>');
    // オーバーレイをフェードイン
    $('.modal-overlay').fadeIn('nomal');

    // モーダルコンテンツのIDを取得
    var modal = '#' + $(this).attr('data-target');
    // モーダルコンテンツの表示位置を設定
    modalResize();
     // モーダルコンテンツフェードイン
    $(modal).fadeIn('nomal');

    // 「.modal-overlay」あるいは「.modal-close」をクリック
    $('.modal-overlay, .modal-close').off().click(function(){
      // モーダルコンテンツとオーバーレイをフェードアウト
      $(modal).fadeOut('nomal');
      $('.modal-overlay').fadeOut('nomal',function(){
        // オーバーレイを削除
        $('.modal-overlay').remove();
      });
    });

    // リサイズしたら表示位置を再取得
    $(window).on('resize', function(){
      modalResize();
    });

    // モーダルコンテンツの表示位置を設定する関数
    function modalResize(){
      // ウィンドウの横幅、高さを取得
      var w = $(window).width();
      var h = $(window).height();

      // モーダルコンテンツの表示位置を取得
      var x = (w - $(modal).outerWidth(true)) / 2;
      var y = (h - $(modal).outerHeight(true)) / 2;

      // モーダルコンテンツの表示位置を設定
      $(modal).css({'left': x + 'px','top': y + 'px'});
    }

  });
});


function clearModalOpen(){
  $(function(){
    // オーバーレイ用の要素を追加
    $('body').append('<div class="clear-modal-overlay"></div>');
    // オーバーレイをフェードイン
    $('.clear-modal-overlay').fadeIn('nomal');

    // // モーダルコンテンツのIDを取得
    // var modal = '#' + $(this).attr('data-target');
    var modal = '#modalIsStageCleared';
    // モーダルコンテンツの表示位置を設定
    clearModalResize();
     // モーダルコンテンツフェードイン
    $(modal).fadeIn('nomal');

    // 「.modal-overlay」あるいは「.modal-close」をクリック
    $('.clear-modal-overlay, .clear-modal-close').off().click(function(){
      // モーダルコンテンツとオーバーレイをフェードアウト
      $(modal).fadeOut('nomal');
      $('.clear-modal-overlay').fadeOut('nomal',function(){
        // オーバーレイを削除
        $('.clear-modal-overlay').remove();
      });
      pm.init(pm.initY, pm.initX, pm.initDir);
      stage.init(puzzleNum);
      stage.repaint();
    });

    // リサイズしたら表示位置を再取得
    $(window).on('resize', function(){
      clearModalResize();
    });

    // モーダルコンテンツの表示位置を設定する関数
    function clearModalResize(){
      // ウィンドウの横幅、高さを取得
      var w = $(window).width();
      var h = $(window).height();

      // モーダルコンテンツの表示位置を取得
      var x = (w - $(modal).outerWidth(true)) / 2;
      var y = $(modal).outerHeight(true) / 2;

      // モーダルコンテンツの表示位置を設定
      $(modal).css({'left': x + 'px','top': y + 'px'});
    }

  });

};
