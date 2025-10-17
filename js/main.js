// DOM読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // モバイルメニューの制御
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // ハンバーガーアイコンの切り替え
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // モバイルメニューのリンクをクリック時にメニューを閉じる
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // スムーススクロールの実装
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ヘッダーのスクロール時の背景色変更
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('bg-white');
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
    
    // アクティブナビゲーションのハイライト
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 200; // ヘッダーの高さを考慮
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('text-blue-600', 'font-semibold');
            item.classList.add('text-gray-700');
            
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.remove('text-gray-700');
                item.classList.add('text-blue-600', 'font-semibold');
            }
        });
    });
    
    // タブ機能の実装（会社概要・沿革）
    const tabOverview = document.getElementById('tab-overview');
    const tabHistory = document.getElementById('tab-history');
    const overviewContent = document.getElementById('overview-content');
    const historyContent = document.getElementById('history-content');
    
    if (tabOverview && tabHistory && overviewContent && historyContent) {
        tabOverview.addEventListener('click', function() {
            // タブのスタイル更新
            tabOverview.classList.add('border-b-2', 'border-blue-600', 'text-blue-600');
            tabOverview.classList.remove('text-gray-600');
            
            tabHistory.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600');
            tabHistory.classList.add('text-gray-600');
            
            // コンテンツの表示切り替え
            overviewContent.classList.remove('hidden');
            historyContent.classList.add('hidden');
        });
        
        tabHistory.addEventListener('click', function() {
            // タブのスタイル更新
            tabHistory.classList.add('border-b-2', 'border-blue-600', 'text-blue-600');
            tabHistory.classList.remove('text-gray-600');
            
            tabOverview.classList.remove('border-b-2', 'border-blue-600', 'text-blue-600');
            tabOverview.classList.add('text-gray-600');
            
            // コンテンツの表示切り替え
            historyContent.classList.remove('hidden');
            overviewContent.classList.add('hidden');
        });
    }
    
    // お問い合わせフォームの処理
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            const data = {
                inquiry_type: formData.get('inquiry_type'),
                company: formData.get('company'),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                privacy: formData.get('privacy')
            };
            
            // バリデーション
            if (!data.inquiry_type) {
                alert('お問い合わせ種別を選択してください。');
                return;
            }
            
            if (!data.name.trim()) {
                alert('お名前を入力してください。');
                return;
            }
            
            if (!data.email.trim()) {
                alert('メールアドレスを入力してください。');
                return;
            }
            
            if (!data.message.trim()) {
                alert('お問い合わせ内容を入力してください。');
                return;
            }
            
            if (!data.privacy) {
                alert('プライバシーポリシーに同意してください。');
                return;
            }
            
            // 簡易的なメールアドレスバリデーション
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('有効なメールアドレスを入力してください。');
                return;
            }
            
            // 送信成功のメッセージ（実際のフォーム送信処理はサーバーサイドで実装）
            alert('お問い合わせありがとうございます。\n内容を確認の上、担当者よりご連絡させていただきます。');
            
            // フォームをリセット
            contactForm.reset();
            
            // ログにフォームデータを出力（開発用）
            console.log('フォーム送信データ:', data);
        });
    }
    
    // ページ読み込み時のアニメーション（オプション）
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素の監視
    const animateElements = document.querySelectorAll('.grid > div, .space-y-6 > div, .bg-white.rounded-lg');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // カスタムCSSアニメーション用のスタイルを追加
    if (!document.querySelector('#custom-animations')) {
        const style = document.createElement('style');
        style.id = 'custom-animations';
        style.textContent = `
            .animate-fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* ホバーエフェクト */
            .hover-scale {
                transition: transform 0.3s ease;
            }
            
            .hover-scale:hover {
                transform: scale(1.05);
            }
            
            /* スクロールバーのスタイリング */
            ::-webkit-scrollbar {
                width: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }
        `;
        document.head.appendChild(style);
    }
    
    // パフォーマンス最適化：画像の遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    console.log('長浜合成工業所のウェブサイトが正常に読み込まれました。');
});

// ページの先頭に戻るボタン（オプション機能）
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 opacity-0 invisible';
    button.id = 'back-to-top';
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.classList.remove('opacity-0', 'invisible');
            button.classList.add('opacity-100', 'visible');
        } else {
            button.classList.add('opacity-0', 'invisible');
            button.classList.remove('opacity-100', 'visible');
        }
    });
}

// 「ページトップに戻る」ボタンを作成
createBackToTopButton();