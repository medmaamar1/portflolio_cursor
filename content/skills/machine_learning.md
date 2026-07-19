# Machine Learning & Deep Learning (MLOps) — Mohamed Maamar

## Technologies
- PyTorch & Torchvision
- Scikit-Learn
- ONNX Runtime Web (`onnxruntime-web`)
- WebAssembly (WASM) & WebGL
- `timm` (EfficientNet)
- DeepLabV3+, BASNet, U-Net++

## Experience
I have extensive experience building and deploying end-to-end Machine Learning pipelines, ranging from hyperscale PyTorch training to on-device edge inference. 

My work in **Deep Learning & Computer Vision** involves training complex architectures (like EfficientNet and DeepLabV3+) from scratch. I have engineered advanced custom loss functions, including Label Distribution Learning (LDL) for scalar regression boundaries, and hybrid losses fusing SSIM, IoU, and BCE for structural texture preservation. I am proficient in distributed training using PyTorch DistributedDataParallel (DDP) and Automatic Mixed Precision (AMP).

In **Classical Machine Learning**, I have deployed unsupervised anomaly detection models (Isolation Forest, LocalOutlierFactor, OneClassSVM) via majority-vote ensembles. I also leverage Scikit-Learn’s `partial_fit` API for incremental, out-of-core model retraining on streaming data without memory bloat.

To eliminate backend streaming costs and ensure real-time latency, I specialize in **On-Device AI (WebML)**. I compile heavy PyTorch models into ONNX and execute them directly on client GPUs using WebAssembly and WebGL, bridging the gap between heavy deep learning and consumer edge devices.
