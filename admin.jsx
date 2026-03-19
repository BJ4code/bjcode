.admin-login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0b0b0f;
  color: white;
  padding: 24px;
}

.admin-login-box {
  width: 100%;
  max-width: 420px;
  background: #16161d;
  border-radius: 24px;
  padding: 30px;
}

.admin-login-box h1 {
  margin-top: 0;
}

.admin-login-box p {
  color: #c7c7d1;
}

.admin-login-box input {
  width: 100%;
  margin-top: 14px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #2c2c35;
  background: #0f0f14;
  color: white;
}

.admin-login-box button {
  margin-top: 16px;
  background: white;
  color: black;
  border: 0;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
}

.login-error {
  color: #ff9f9f;
  margin-top: 12px;
}

.admin-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  background: #0b0b0f;
  color: white;
}

.admin-sidebar {
  background: #111118;
  border-right: 1px solid #22222c;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.admin-sidebar h2 {
  margin: 0 0 10px;
}

.admin-sidebar button,
.back-home {
  background: #1a1a22;
  color: white;
  border: 1px solid #2b2b35;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  text-align: right;
}

.logout-btn {
  background: #3a1313 !important;
  color: #ffb3b3 !important;
}

.back-home {
  display: inline-block;
}

.admin-main {
  padding: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.stat-card {
  background: #16161d;
  border-radius: 18px;
  padding: 20px;
}

.stat-card h3 {
  margin: 0;
  font-size: 34px;
}

.admin-form {
  display: grid;
  gap: 14px;
  margin-top: 20px;
  max-width: 700px;
}

.admin-form input,
.admin-form textarea,
.admin-form select {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #2c2c35;
  background: #0f0f14;
  color: white;
}

.admin-form button {
  background: white;
  color: black;
  border: 0;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  width: fit-content;
}

.preview-card {
  margin-top: 25px;
  background: #16161d;
  border-radius: 20px;
  padding: 20px;
  max-width: 700px;
}

.preview-card img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 14px;
  margin: 16px 0;
}

.prompt-list {
  display: grid;
  gap: 18px;
  margin-top: 20px;
}

.prompt-item {
  display: grid;
  grid-template-columns: 160px 1fr auto;
  gap: 16px;
  background: #16161d;
  border-radius: 18px;
  padding: 16px;
  align-items: center;
}

.prompt-item img {
  width: 160px;
  height: 120px;
  object-fit: cover;
  border-radius: 14px;
}

.prompt-item-content p {
  color: #c8c8d2;
  line-height: 1.6;
}

.delete-btn {
  background: #3a1313;
  color: #ffb3b3;
  border: 0;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
}

.status-badge {
  display: inline-block;
  margin-top: 10px;
  background: #262633;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
}

.settings-box {
  background: #16161d;
  border-radius: 18px;
  padding: 20px;
  max-width: 700px;
}

@media (max-width: 900px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .prompt-item {
    grid-template-columns: 1fr;
  }

  .prompt-item img {
    width: 100%;
    height: 220px;
  }
}
