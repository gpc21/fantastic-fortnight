(() => {
  const yearEl = document.querySelector("footer small span");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const contactForm = document.querySelector('form[data-contact-form="true"]');
  if (!contactForm) return;

  const statusEl = contactForm.querySelector('[data-form-status="true"]');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const emailInput = contactForm.querySelector('input[name="email"]');

  const setStatus = (msg, tone) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.dataset.tone = tone;
  };

  const setFieldInvalid = (field, isInvalid) => {
    if (!field) return;
    if (isInvalid) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    setStatus("", "idle");

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("请填写姓名、邮箱与留言内容。", "error");
      setFieldInvalid(contactForm.querySelector('[name="name"]'), !name);
      setFieldInvalid(emailInput, !email);
      setFieldInvalid(contactForm.querySelector('[name="message"]'), !message);
      return;
    }

    setFieldInvalid(contactForm.querySelector('[name="name"]'), false);
    setFieldInvalid(emailInput, false);
    setFieldInvalid(contactForm.querySelector('[name="message"]'), false);

    const nativeEmailOk =
      emailInput && typeof emailInput.checkValidity === "function"
        ? emailInput.checkValidity()
        : true;
    const emailOk =
      nativeEmailOk && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setStatus("邮箱格式不正确，请检查后再提交。", "error");
      setFieldInvalid(emailInput, true);
      if (emailInput && typeof emailInput.focus === "function") emailInput.focus();
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    setStatus("正在提交…", "pending");

    window.setTimeout(() => {
      setStatus(
        subject
          ? `提交成功！我已收到你的信息（主题：${subject}），会尽快回复。`
          : "提交成功！我已收到你的信息，会尽快回复。",
        "success"
      );
      contactForm.reset();
      if (submitBtn) submitBtn.disabled = false;
    }, 700);
  });
})();
