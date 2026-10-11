% resume.cls: small one-page-style resume class.
% Provides: \name, \address (call twice for a left and a right block), rSection, \mySubTitleStyle.
\ProvidesClass{resume}[2026/03/01 Resume class]
\LoadClass[10pt,letterpaper]{article}
\usepackage[parfill]{parskip}
\usepackage{array}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[hidelinks]{hyperref}
\usepackage{xcolor}
\usepackage{titlesec}
\usepackage{enumitem}

\pagestyle{empty}
\setlength{\tabcolsep}{0pt}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}

% ----- Header -----
\def\name#1{\def\@name{#1}}
\def\@name{}
\def\@addressone{}
\def\@addresstwo{}
\newcount\@addresscount \@addresscount=0
\def\address#1{%
  \ifnum\@addresscount=0 \def\@addressone{#1}\else\def\@addresstwo{#1}\fi
  \advance\@addresscount by 1\relax}

\AtBeginDocument{%
  \begin{center}
    {\Huge\bfseries \@name}\\[6pt]
    \begin{minipage}[t]{0.48\textwidth}\raggedright\small \@addressone\end{minipage}\hfill
    \begin{minipage}[t]{0.48\textwidth}\raggedleft\small \@addresstwo\end{minipage}
  \end{center}
  \vspace{-0.6em}}

% ----- Sections -----
\newenvironment{rSection}[1]{%
  \medskip
  {\large\bfseries\scshape #1}\par\vspace{-0.45em}%
  \hrule height 0.6pt\vspace{0.35em}%
  \begin{list}{}{\setlength{\leftmargin}{0em}\setlength{\itemsep}{0.2em}\setlength{\parsep}{0.25em}\setlength{\topsep}{0pt}\setlength{\parskip}{0pt}}\item[]}
 {\end{list}\vspace{0.2em}}

\newcommand{\mySubTitleStyle}[1]{\textbf{#1}}

% Bullets inside the section list
\setlist[itemize]{leftmargin=1.4em,topsep=2pt,partopsep=0pt,parsep=1pt}
