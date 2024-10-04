---
title: "Dissertation"
project:
    header: "My Dissertation"
    link: "https://github.com/olworth/dissertation-portfolio"
---

My dissertation was titled: "Exploring and Understanding Cross-Lingual Transfer to Catalan and Galician via High-Resource Typological Relatives", and recieved a Distinction mark. In case you couldn't tell, I'm super proud of it. You can download a copy of it [here]({{ downloads.dissertation }}), fresh off the LaTeX press.

I'll spare you the details here (check out the GitHub repo or the actual document itself for those), but the bulk of the project was an investigation into NLP tasks in Catalan and Galician, two low-resource languages. I fine-tuned RoBERTa and T5 transformer language models in a cross-lingual transfer learning paradigm, with an aim to leverage knowledge learned in higher-resource typological relatives of these languages, such as Spanish and Portuguese. I saw some nice results, and am particularly happy with the way my "language family" models - created by pruning redundant embeddings from MMTs - performed.