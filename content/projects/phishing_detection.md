# Phishing & Spam Interception System — ML-Powered Email Security

**Architected and engineered by Mohamed Maamar (Med).** A distributed email security system combining an SMTP proxy interceptor with scikit-learn ML models for real-time phishing and spam detection, featuring incremental online retraining.

---

## 1. Tech Stack (verified only)
- **Language:** Python (>= 3.8)
- **Frameworks:** FastAPI, Uvicorn, Pydantic
- **Machine Learning:** scikit-learn, numpy, pandas, joblib
- **Email Processing:** aiosmtpd, exchangelib (Exchange Web Services)
- **Database:** Supabase (PostgreSQL)

---

## 2. Architecture

**Architected by Mohamed Maamar.** Distributed micro-service architecture:
- **SMTP Proxy Interceptor:** Async SMTP server on port 1025 intercepts outgoing/incoming emails, runs ML classification on-the-fly, appends spam/phishing headers, forwards to real SMTP host.
- **Active Exchange Polling:** EWS integration monitors Microsoft Exchange mailboxes.
- **Async Feedback Loop:** FastAPI collects user corrections (false positives/negatives), stores in Supabase, triggers automated model retraining.

---

## 3. AI/ML Components

**Engineered by Mohamed Maamar.**
- **Models:** Spam classifier (Multinomial Naive Bayes / SGD), Phishing detector (tabular pipeline), TF-IDF vectorizer.
- **Incremental Online Retraining:** Uses scikit-learn `partial_fit` to update model weights in batches of 10,000 — no full retraining needed.
- **Hybrid Features:** NLP via TF-IDF + tabular features (HTML stripping, character counts, link analysis, phishing keyword flags).
- **Feature Selection:** Pandas correlation matrices (`df.corr()`) prune redundant features, prevent overfitting.

### Performance
- **Accuracy:** 94.85%, **Precision:** 98.67%, **Recall:** 91.52%, **F1:** 94.96%, **ROC AUC:** 97.51%
- **Latency:** Under 100ms per email interception and classification.
- **Impact:** Reduced malicious inbox intrusions to under 0.5%, improved threat detection coverage by 40%.
