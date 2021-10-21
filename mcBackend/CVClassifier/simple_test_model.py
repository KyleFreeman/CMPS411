"""# Imports """
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
import numpy as np
import argparse

import matplotlib.pyplot as plt
import sys

from tensorflow.keras import layers

"""# Directory Prep"""


class_names = ["Actinophrys", "Arcella", "Aspidisca",
               "Codosiga", "Colpoda", "Epistylis", "Euglypha",
               "Paramecium", "Rotifera", "Vorticella", "Noctiluca",
               "Ceratium", "Stentor", "Siprostomum", "K.Quadrala",
               "Euglena", "Gymnodinium", "Gonyaulax", "Phacus",
               "Stylonychia", "Synchaeta"]

parser = argparse.ArgumentParser()

parser.add_argument('--file', help='picture to be uploaded enclosed with quotes. Example: "test.png"')
parser.add_argument('dataset_path', help='the path to the dataset location enclosed with quotes. Example: "C:\Dataset" ')
parser.add_argument('--train', action='store_true', help='train the model')
parser.add_argument('--test', action='store_true', help='predict with the model')

args = parser.parse_args()

u_filepath = args.file
data_directory = args.dataset_path

METRICS = [
    tf.keras.metrics.Precision(name='precision'),
    tf.keras.metrics.CategoricalAccuracy(name='accuracy')
]

model = tf.keras.Sequential()

model.add(layers.Dense(50, input_shape=(256, 256, 3)))
# model.add(layers.Dense(30, activation='relu'))
# model.add(layers.Dense(15, activation='relu'))
model.add(layers.Dense(15, activation='relu'))

model.add(layers.Dropout(0.2))
model.add(layers.Flatten())
model.add(layers.Dense(len(class_names), activation='softmax'))
model.compile(
    optimizer=tf.keras.optimizers.Adam(),
    loss='categorical_crossentropy',
    metrics=METRICS
)

batch_size = 64
if args.train:
    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
        directory=data_directory,
        image_size=(256, 256),
        validation_split=0.2,
        batch_size=batch_size,
        class_names=class_names,
        label_mode='categorical',
        seed=1337,
        subset="training"
    )

    val_ds = tf.keras.preprocessing.image_dataset_from_directory(
        directory=data_directory,
        image_size=(256, 256),
        validation_split=0.2,
        batch_size=batch_size,
        class_names=class_names,
        label_mode='categorical',
        seed=1337,
        subset="validation"
    )
    size = (256, 256)

    train_ds = train_ds.map(lambda x, y: (tf.image.resize(x, size), y))
    val_ds = val_ds.map(lambda x, y: (tf.image.resize(x, size), y))

    model.fit(train_ds, batch_size=64, epochs=2, verbose=1, validation_data=val_ds)
    model.save_weights('./CVClassifier/model_weights')
    print("Model Trained!")

file_name = os.path.basename(u_filepath)
user_upload = tf.keras.preprocessing.image.load_img(u_filepath)
input_arr = tf.keras.preprocessing.image.img_to_array(user_upload)
input_arr = np.array([tf.image.resize(input_arr, (256, 256))])

if args.test:
    model.load_weights('./CVClassifier/model_weights')

    y_pred = model.predict(input_arr)

    y_pred = y_pred.argmax(axis=1)

    """# Returns"""

    print(file_name)
    print(class_names[int(y_pred)])
