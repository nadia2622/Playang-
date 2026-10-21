/**
 * Data Game Edukasi Dialog Wayang Punakawan Banyumas
 * Bersumber dari COPYWRITING.md & Skenario Dalang Interaktif
 */

export const DIALOGUE_GAMES = {
  semar: {
    id: 'semar',
    title: 'MODE SEMAR',
    subtitle: 'Sang Pengayom',
    karakter: 'Semar',
    avatar: '/assets/semar.png',
    opponentAvatar: '/assets/gareng.png',
    opponentName: 'Gareng',
    intro: {
      audioCue: 'Layar menampilkan siluet wayang. Musik gamelan lembut bergaung di latar kelir.',
      narasi: 'Di tengah sawah yang sunyi di lereng Gunung Slamet, tampak seorang tua berwajah teduh sedang duduk bersila. Senyumnya lembut, matanya tampak berair. Dialah Semar, sang pamong sejati — bijak dalam kata, sederhana dalam laku. Hari ini, ia menanti kabar dari ketiga anaknya yang sedang belajar memahami makna kehidupan…'
    },
    dialogue: {
      speaker1: 'Gareng',
      text1: 'Rama Semar, aku bingung. Kenapa hidup harus banyak cobaan?',
      speaker2: 'Semar',
      text2: 'Hehehe… Le... Cobaan kuwe udu musuh. Cobaan kuwe guru.'
    },
    question: {
      title: 'JIKA KAMU ADALAH SEMAR, JAWABAN APA YANG AKAN KAMU PILIH',
      options: [
        {
          id: 1,
          choiceText: 'Saben kesulitan, ana pelajaran sing kudu dipetik.',
          choiceTranslation: '(Setiap masalah, ada pelajaran yang harus dipetik)',
          reactionSpeaker: 'Gareng',
          reactionText: 'Oooh… jadi kabeh ya ana maksude ya, Rama?',
          semarResponse: 'Yo, Gareng. Kaya pari. Ben ngisi, kudu ndangak karo nunduk.',
          semarResponseTranslation: '(Yo, Gareng. Seperti padi, kalau mau berisi, harus melihat ke atas dan ke bawah)',
          moral: 'Rendah hati dan sabar dalam kesulitan',
          xp: 100
        },
        {
          id: 2,
          choiceText: 'Wong urip kuwe kudu kuat, ben ora gampang keliru.',
          choiceTranslation: '(Orang hidup itu harus kuat, supaya tidak gampang salah)',
          reactionSpeaker: 'Semar',
          reactionText: 'Kuat kuwe penting, tapi lewih penting eling. Wong kuat nanging klalen, bisa nggegirisi.',
          semarResponse: 'Kuat tanpa kesadaran bisa berbahaya bagi diri dan sesama.',
          semarResponseTranslation: '(Kekuatan sejati lahir dari kesadaran batin)',
          moral: 'Kekuatan tanpa kesadaran batin bisa berbahaya',
          xp: 85
        },
        {
          id: 3,
          choiceText: 'Kowe wes mangan urung? Biasane pikiran kosong kuwe merga wetenge kencot.',
          choiceTranslation: '(Kamu udah makan, belum? Biasanya pikiran kosong itu karena lapar)',
          reactionSpeaker: 'Gareng',
          reactionText: 'Hahaha... iya, Rama. Aku mikir kosong sebab kencot!',
          semarResponse: 'Wah, kuwe artine pikiran karo weteng kudu seimbang. Elmu ora bisa mlebu nek wetengmu krucuk-krucuk.',
          semarResponseTranslation: '(Pikiran dan perut harus seimbang. Ilmu takkan masuk bila perut keroncongan)',
          moral: 'Keseimbangan antara kebutuhan jasmani dan ketenangan rohani',
          xp: 95
        }
      ]
    },
    ending: {
      narasi: 'Semar tersenyum, menatap langit sore yang kemerahan. Dalam diam, ia tahu — kadang manusia hanya butuh dituntun dengan tawa dan kasih sayang.',
      falsafah: 'Urip iku urup. Hidup yang sejati adalah hidup yang memberi cahaya bagi sesama.',
      moralSummary: 'Hidup harus bermanfaat bagi orang lain dengan kesabaran, welas asih, dan keseimbangan.'
    }
  },

  gareng: {
    id: 'gareng',
    title: 'MODE GARENG',
    subtitle: 'Si Penengah yang Rendah Hati',
    karakter: 'Gareng',
    avatar: '/assets/gareng.png',
    opponentAvatar: '/assets/bawor.png',
    opponentName: 'Bawor & Petruk',
    intro: {
      audioCue: 'Suara jangkrik malam dan tawa samar terdengar di pelataran rumah Semar.',
      narasi: 'Malam itu, Gareng duduk di depan rumah sambil mengelap wayangnya. Wajahnya tampak serius, tapi matanya menyimpan kegelisahan. Sejak siang, ia melihat Petruk dan Bawor bertengkar soal hal sepele — dan kini ia mencoba mencari cara untuk menengahi.'
    },
    dialogue: {
      speaker1: 'Gareng',
      text1: 'Aduh… kepriwe ya. Rama Semar lagi semedi, Petruk karo Bawor malah padu.',
      speaker2: 'Bawor & Petruk',
      text2: 'Bawor: "Lho Gareng! Milih aku apa Petruk?" | Petruk: "Heh aja ngajak Gareng, dheweke wongnya alus!"'
    },
    question: {
      title: 'JIKA KAMU ADALAH GARENG, BAGAIMANA CARAMU MENENGAHI MEREKA?',
      options: [
        {
          id: 1,
          choiceText: 'Waduh, aja padha padu. Wong becik kuwe sing bisa nahan emosi.',
          choiceTranslation: '(Waduh, jangan bertengkar. Orang baik itu yang bisa menahan amarah)',
          reactionSpeaker: 'Petruk & Bawor',
          reactionText: 'Petruk: "Hmm… iya, aku kebablasan." | Bawor: "Aku ya njaluk ngapura ya."',
          semarResponse: 'Sing penting aja gampang kesuh. Wong kesuh kuwe kaya geni, cepet kobong tapi gampang padam.',
          semarResponseTranslation: '(Jangan lekas marah. Amarah itu seperti api, cepat membakar tapi cepat padam)',
          moral: 'Sabar dan mampu menahan amarah membawa kedamaian persaudaraan',
          xp: 100
        },
        {
          id: 2,
          choiceText: 'Aku milih… mangan bareng bae! Weteng kosong malah nambah emosi.',
          choiceTranslation: '(Aku milih… makan bareng saja. Perut kosong bikin emosi)',
          reactionSpeaker: 'Petruk & Bawor',
          reactionText: 'Petruk: "Hahaha, Gareng bener!" | Bawor: "Yo wis ayo mangan mendoan bareng!"',
          semarResponse: 'Nah, kaya kuwe. Nek wareg, ati dadi adem.',
          semarResponseTranslation: '(Nah begitu dong. Kalau kenyang, hati pun jadi sejuk damai)',
          moral: 'Kebersamaan dan kerukunan meredakan segala sengketa',
          xp: 95
        },
        {
          id: 3,
          choiceText: 'Hehe, sing menang tak traktir wedang jahe, sing kalah ngumbah piring.',
          choiceTranslation: '(Hehe, yang menang aku traktir wedang jahe, yang kalah cuci piring)',
          reactionSpeaker: 'Petruk & Bawor',
          reactionText: 'Bawor: "Hahaha kalah deh! Tapi aku wis ngumbah piring ya!" | Petruk: "Lucu tapi manjur!"',
          semarResponse: 'Guyon kuwe obat kanggo ati sing tegang.',
          semarResponseTranslation: '(Canda tawa adalah obat mujarab bagi hati yang sedang tegang)',
          moral: 'Humor cerdas menjadi jembatan mencairkan konflik',
          xp: 90
        }
      ]
    },
    ending: {
      narasi: 'Setelah semua tenang, Gareng tersenyum lega. Malam itu ia sadar — kadang, menyatukan hati tidak perlu dengan banyak kata, cukup dengan sedikit tawa dan keikhlasan.',
      falsafah: 'Rama bener... wong sing menunduk kuwe ora kalah, tapi ngerti carane njaga tentrem.',
      moralSummary: 'Rendah hati, sabar, dan bijak dalam menghadapi perbedaan.'
    }
  },

  petruk: {
    id: 'petruk',
    title: 'MODE PETRUK',
    subtitle: 'Si Lugas dan Panjang Akal',
    karakter: 'Petruk',
    avatar: '/assets/petruk.png',
    opponentAvatar: '/assets/semar.png',
    opponentName: 'Rama Semar',
    intro: {
      audioCue: 'Angin sepoi berhembus di bawah pohon jambu pelataran rumah Semar.',
      narasi: 'Hari itu suasana rumah Semar agak berbeda. Petruk duduk sendirian di bawah pohon jambu, memegang sesuatu yang ia sembunyikan dari ketiga saudaranya. Biasanya Petruk selalu riang dan ngeyelan, tapi kali ini wajahnya murung. Gareng, Bawor, dan Semar memperhatikan dari jauh…'
    },
    dialogue: {
      speaker1: 'Semar',
      text1: 'Truk… nek atimu lagi abot, omongna. Wong seduluran kuwi ora mung pas guyon.',
      speaker2: 'Petruk',
      text2: 'Iki… surat undangan pentas manggung neng kutha, bayarane gedhe. Nanging… nek aku lunga, kowe bertelu piye?'
    },
    question: {
      title: 'SEBAGAI PETRUK, BAGAIMANA KAMU MENGUTARAKAN PERASAANMU?',
      options: [
        {
          id: 1,
          choiceText: 'Mengutarakan ketakutan dengan tulus: "Aku wedi ora iso bali lan kowe padha lali."',
          choiceTranslation: '(Aku takut tidak bisa kembali dan kalian melupakanku)',
          reactionSpeaker: 'Gareng & Bawor',
          reactionText: 'Gareng: "Sedulur ora bakal ilang merga adoh!" | Bawor: "Nek kangen, tak parani neng kutha!"',
          semarResponse: 'Perjalanan kuwi bagian saka urip. Nanging omah tetep ana ning kene.',
          semarResponseTranslation: '(Perjalanan adalah bagian hidup, namun rumah sejatimu selalu ada di sini)',
          moral: 'Rasa takut itu manusiawi, dan persaudaraan sejati tak goyah oleh jarak',
          xp: 100
        },
        {
          id: 2,
          choiceText: 'Menutupi rasa takut dengan humor: "Panggung kutha bakal ambruk merga irungku kepanjangan!"',
          choiceTranslation: '(Bercanda panggung kota akan roboh karena hidung kepanjangan)',
          reactionSpeaker: 'Bawor & Semar',
          reactionText: 'Bawor: "HAHAHA ra mashok Truk!" | Semar: "Wong sing guyon sok malah sing paling abot atine."',
          semarResponse: 'Aja wedi dadi awakmu dhewe. Ngguyu iku apik, nanging jujur ing ati luwih utama.',
          semarResponseTranslation: '(Jangan takut jujur. Tertawa itu baik, tapi jujur pada diri sendiri lebih utama)',
          moral: 'Humor bisa menghibur, tetapi kita harus jujur pada isi hati sendiri',
          xp: 85
        },
        {
          id: 3,
          choiceText: 'Meminta saran tulus pada Rama: "Mar… kudu piye? Ati pengin maju nanging pengin tetep ning kene."',
          choiceTranslation: '(Mar… harus bagaimana? Hati ingin maju tapi ingin tetap bersama saudara)',
          reactionSpeaker: 'Semar',
          reactionText: 'Truk, sing penting ngelakoni urip sing nggawe atimu lega. Lungo yo ora apa, balik yo ora apa.',
          semarResponse: 'Gareng: "Sing penting kabari nek wis tekan kutha ya Truk."',
          semarResponseTranslation: '(Yang utama adalah ketenangan hati dan menjaga silaturahmi)',
          moral: 'Meminta nasihat dan dukungan keluarga adalah tanda kedewasaan batin',
          xp: 95
        }
      ]
    },
    ending: {
      narasi: 'Malam itu Petruk memandang bintang-bintang di langit. Ia menutup matanya dan menarik napas panjang dengan mantap.',
      falsafah: 'Rejeki, perjalanan, persaudaraan… kabeh tak lakoni pelan-pelan wae.',
      moralSummary: 'Kadang keberanian terbesar adalah mengakui rasa takut — dan tetap melangkah maju.'
    }
  },

  bawor: {
    id: 'bawor',
    title: 'MODE BAWOR',
    subtitle: 'Si Jujur dan Apa Adanya (Ikon Banyumas)',
    karakter: 'Bawor',
    avatar: '/assets/bawor.png',
    opponentAvatar: '/assets/semar.png',
    opponentName: 'Gareng, Petruk & Semar',
    intro: {
      audioCue: 'Pagi hari yang hening tanpa suara celoteh lantang khas Banyumasan.',
      narasi: 'Tidak seperti biasanya, pagi itu rumah Semar terasa… sepi. Bawor duduk sendirian di pojokan, merengut sambil memegang wayang buatannya yang lusuh. Kalau Bawor sudah diam… itu lebih menakutkan daripada ketika ia ribut. Ada apa dengan Ki Bawor?'
    },
    dialogue: {
      speaker1: 'Semar',
      text1: 'Wor… nek atimu mumet, ngomongo. Bapak ngrungokake.',
      speaker2: 'Bawor',
      text2: 'Iki wayang tak gawe dhewe. Tapi Gareng lan Truk ngomong nek wayangku elek… kaya tempe basi!'
    },
    question: {
      title: 'SEBAGAI BAWOR, BAGAIMANA CARAMU MERESPONS EJEKAN SAUDARAMU?',
      options: [
        {
          id: 1,
          choiceText: 'Mengaku tersinggung secara jujur (Cablaka): "Aku ki loro ati, Mar… Aku wis usaha nanging diolok-olok."',
          choiceTranslation: '(Aku sakit hati, Mar… Aku sudah berusaha tapi malah diejek)',
          reactionSpeaker: 'Gareng & Petruk',
          reactionText: 'Gareng: "Wor, aku ora niat gawe sedih." | Petruk: "Ngapuro ya Wor, kowe nduwe bakat mung butuh latihan."',
          semarResponse: 'Cablaka iku becik. Rasa sakit diungkapkan kanthi jujur bakal nuwuhake pangapura.',
          semarResponseTranslation: '(Kejujuran cablaka itu baik. Mengungkapkan rasa sakit secara jujur mendatangkan maaf)',
          moral: 'Mengungkapkan perasaan secara jujur tanpa dendam adalah langkah kedewasaan',
          xp: 100
        },
        {
          id: 2,
          choiceText: 'Marah dan meledak: "KOWE LORO! KOWE KARO TRUK GAWE AKU KAYA SAMPAH!"',
          choiceTranslation: '(Kalian berdua membuatku merasa seperti sampah!)',
          reactionSpeaker: 'Semar',
          reactionText: 'Wor… nesu ora nggawe wayangmu luwih apik. Nanging ngomong apik-apikan kuwi bisa.',
          semarResponse: 'Bawor (mereda): "Aku… mung pingin diapresiasi sithik wae."',
          semarResponseTranslation: '(Marah itu manusiawi, tapi bimbinglah amarah agar tidak merusak)',
          moral: 'Marah adalah luapan wajar, namun harus diarahkan secara bijak agar tidak merusak',
          xp: 80
        },
        {
          id: 3,
          choiceText: 'Minta diajari memperbaiki: "Mar… piye nek aku pengin sinau nggawe wayang sing apik tenan?"',
          choiceTranslation: '(Mar… bagaimana kalau aku ingin belajar membuat wayang yang sungguh bagus?)',
          reactionSpeaker: 'Semar & Sedulur',
          reactionText: 'Semar: "Kepengin sinau iku wis separo saka pinter!" | Petruk: "Ayo sinau bareng!"',
          semarResponse: 'Gareng: "Kowe duwe tenaga, Petruk duwe akal, aku duwe mata jeli… komplit!"',
          semarResponseTranslation: '(Semangat belajar dan saling melengkapi membawa kemajuan bersama)',
          moral: 'Kemauan untuk belajar adalah kunci utama meraih kemahiran sejati',
          xp: 100
        }
      ]
    },
    ending: {
      narasi: 'Malam harinya di bawah sinar rembulan, Bawor memandangi wayang buatannya sambil tersenyum hangat.',
      falsafah: 'Aku mungkin ora pinter… nanging aku iso sinau. Lan sedulurku bakal tansah mbantu aku.',
      moralSummary: 'Ketulusan hati, kejujuran cablaka, dan kerendahan hati untuk belajar bersama.'
    }
  }
};
