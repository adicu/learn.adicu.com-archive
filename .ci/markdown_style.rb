all

exclude_rule "blanks-around-lists"
exclude_rule "first-line-h1"
exclude_rule "single-h1"

rule "first-header-h1", level: 2  # <h1> is title, use <h2> for top-level
rule "header-style", style: :atx
rule "hr-style", style: "---"
rule "line-length", line_length: 72, code_blocks: false
rule "no-trailing-punctuation", punctuation: ".,;:"
rule "ol-prefix", style: :ordered
rule "ul-style", style: :dash
