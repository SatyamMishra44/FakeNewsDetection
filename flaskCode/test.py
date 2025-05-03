from tensorflow.keras.models import load_model, model_from_json
import h5py

# Step 1: Read the model config from the .h5 file
with h5py.File('model.h5', 'r') as f:
    model_config = f.attrs.get('model_config')
    # Only decode if it's bytes
    if isinstance(model_config, bytes):
        model_config = model_config.decode('utf-8')

# Step 2: Rebuild the model from JSON
from tensorflow.keras.models import model_from_json
model = model_from_json(model_config)

# Step 3: Load the weights separately
model.load_weights('model.h5')

# Step 4: Save in TensorFlow's SavedModel format
model.save('model_tf', save_format='tf')

print("✅ Model loaded and converted successfully.")
