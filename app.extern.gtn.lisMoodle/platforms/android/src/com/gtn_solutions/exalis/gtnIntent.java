/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.gtn_solutions.exalis;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.*;

public class gtnIntent extends CordovaActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.init();
		// Set by <content src="index.html" /> in config.xml
		Intent intent = getIntent();
		String action = intent.getAction();
		String type = intent.getType();

		Uri imageUri = null;
		
		if (Intent.ACTION_SEND.equals(action) && type != null) {
			if (type.startsWith("image/")) {
				imageUri = (Uri) intent
						.getParcelableExtra(Intent.EXTRA_STREAM);
				if (imageUri != null) {
					Log.v("intenturl", imageUri.toString());
				}
			}
		}

		super.loadUrl("file:///android_asset/www/pages/portfolioNewItem.html?image="+imageUri.toString());
	}
}
