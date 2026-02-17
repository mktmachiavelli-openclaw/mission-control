# Akasha Finance — Projeto de Desenvolvimento

**Status:** Escopo em andamento  
**Data de Início:** 2026-02-16  
**Owner:** Gustavo Machiavelli (Gu)  
**Grupo Telegram:** Clawd - Akasha Finance  
**Modelo Base:** Mobills (análise completa realizada)

---

## 1. VISÃO DO PROJETO

Desenvolver um aplicativo web de controle financeiro pessoal, inspirado no Mobills, com customizações específicas definidas pelo Gu.

**MVP Objetivo:** Dashboard funcional, CRUD de transações, relatórios básicos  
**Timeline Esperada:** 2-3 semanas (MVP) → 6-8 semanas (full)

---

## 2. REQUISITOS DO PRODUTO

### ✅ AJUSTES DEFINIDOS (Gu - 2026-02-16 21:05)

1. **Sem integração com bancos** — Elimina complexidade de API banking
2. **CSV Upload + Reconciliation** — Subir fatura do cartão (CSV) e conciliar vs lançamentos manuais
   - Detecta: transações esquecidas, cobranças indevidas, discrepâncias
   - Fluxo: Upload → Parser → Matching view → Approve/Reject diffs

**Status:** ✅ Confirmado

---

## 3. CORE FEATURES (DEFINIDAS)

### MVP Must-Have
✅ Dashboard com cards de resumo  
✅ Gestão de contas  
✅ CRUD de transações (manual)  
✅ Cartões de crédito + Faturas  
✅ **[NOVO] CSV Upload + Reconciliation** ← Feature principal diferencial  
✅ Relatórios com gráficos (pizza)  
✅ Configurações (idioma, moeda, tema)

### ❌ Fora do escopo (Simplificações)
❌ Integração com bancos (removido conforme Ajuste 1)  

**Detalhes:** Ver arquivo `Mobills-Analysis-Report.md`

### Viabilidade
- ✅ Totalmente replicável
- 📊 Complexidade: 6/10
- 🛠️ Tech Stack: Frontend + Backend + DB

---

## 4. STACK TÉCNICO (A DEFINIR)

### Opções Recomendadas

**Frontend:**
- React 18 + Vite (recomendado: rápido, moderno)
- Vue 3 + Vite (alternativa leve)
- Next.js 14 (fullstack integrado)

**Backend:**
- Node.js + Express (rápido, ecossistema rico)
- Python + FastAPI (dados, analytics)
- Django (Django REST Framework)

**Database:**
- PostgreSQL (robusto, relações bem definidas)
- MongoDB (flexível, prototipagem)

**Gráficos:**
- Chart.js (simples)
- Recharts (React-native, bom)
- D3.js (complexo, poderoso)

**Status:** ⏳ Gu confirma preferência

---

## 5. ROADMAP (PROPOSTO)

### Fase 1: Setup + MVP (Semanas 1-2)
- [ ] Definir stack tech
- [ ] Criar boilerplate (frontend + backend)
- [ ] Setup banco de dados (schema)
- [ ] Autenticação (login/logout)
- [ ] CRUD transações básico
- [ ] Dashboard com cards resumidos

### Fase 2: Features Core (Semanas 3-4)
- [ ] Gestão de contas
- [ ] Categorias
- [ ] Filtros e busca em transações
- [ ] Período/seletor de mês
- [ ] Relatórios básicos (gráfico pizza)

### Fase 3: Features Avançadas (Semanas 5-6)
- [ ] Cartões de crédito + faturas
- [ ] Planejamento mensal
- [ ] Múltiplos gráficos
- [ ] Configurações (tema, idioma, moeda)

### Fase 4: Polimento (Semanas 7-8)
- [ ] Testes (unitários, integração)
- [ ] Responsividade mobile
- [ ] Performance
- [ ] Deploy (Vercel/Netlify + Railway/Heroku)

---

## 6. ESTRUTURA DE DADOS (ESQUEMA BASE)

### Tabelas Principais

**users**
- id (UUID)
- email
- password_hash
- name
- language (pt-BR, en)
- currency (BRL, USD)
- theme (dark, light)
- created_at

**accounts**
- id (UUID)
- user_id (FK)
- name (ex: "CG Akasha", "Carteira")
- type (conta_corrente, poupança, carteira, investimento)
- balance (decimal)
- balance_planned (decimal)
- icon (emoji/color)
- created_at

**categories**
- id (UUID)
- user_id (FK)
- name (ex: "Lazer", "Alimentação")
- icon
- color
- type (expense, income)
- created_at

**transactions**
- id (UUID)
- user_id (FK)
- account_id (FK)
- category_id (FK)
- description
- value (decimal)
- date
- status (complete, pending)
- created_at
- updated_at

**credit_cards**
- id (UUID)
- user_id (FK)
- name (ex: "VISA Cartão XP")
- flag (visa, mastercard, etc)
- limit (decimal)
- due_date (dia do mês)
- created_at

**invoices**
- id (UUID)
- credit_card_id (FK)
- month_year
- total_value (decimal)
- status (open, closed, paid)
- due_date
- created_at

**budgets**
- id (UUID)
- user_id (FK)
- month_year
- planned_income (decimal)
- planned_expenses (decimal)
- created_at

---

## 7. COMPONENTES FRONTEND (BASE)

- **Card** — Componente base de cards
- **Table** — Tabela com sorting/paginação
- **Chart** — Wrapper para gráficos
- **Form** — Formulários (transações, contas)
- **Modal** — Diálogos confirmação
- **Sidebar** — Menu lateral
- **TopBar** — Barra superior (usuário, período)
- **Dashboard** — Página principal
- **Transactions** — Lista de transações
- **Reports** — Página de relatórios
- **Accounts** — Gerenciamento de contas
- **Settings** — Configurações

---

## 8. ENDPOINTS API (PROPOSTOS)

### Auth
- `POST /auth/register` — Cadastro
- `POST /auth/login` — Login
- `POST /auth/logout` — Logout
- `GET /auth/me` — Dados do usuário

### Transactions
- `GET /transactions?month=YYYY-MM` — Listar por período
- `POST /transactions` — Criar
- `GET /transactions/:id` — Detalhe
- `PUT /transactions/:id` — Editar
- `DELETE /transactions/:id` — Deletar

### Accounts
- `GET /accounts` — Listar
- `POST /accounts` — Criar
- `PUT /accounts/:id` — Editar
- `DELETE /accounts/:id` — Deletar

### Categories
- `GET /categories` — Listar
- `POST /categories` — Criar
- `PUT /categories/:id` — Editar
- `DELETE /categories/:id` — Deletar

### Reports
- `GET /reports/expenses-by-category?month=YYYY-MM` — Gráfico pizza
- `GET /reports/monthly-balance?month=YYYY-MM` — Balanço mensal
- `GET /reports/summary?month=YYYY-MM` — Resumo geral

### Credit Card Reconciliation (NOVO)
- `POST /reconciliation/upload` — Upload CSV da fatura
- `GET /reconciliation/pending?invoice_id=X` — Listar discrepâncias (pendentes conciliação)
- `POST /reconciliation/match` — Matchear transação manual com fatura
- `POST /reconciliation/approve` — Aprovar discrepância ou cobrar indevida

### Credit Cards
- `GET /credit-cards` — Listar
- `POST /credit-cards` — Criar
- `GET /credit-cards/:id/invoices?month=YYYY-MM` — Faturas

---

## 9. DECISÕES CONFIRMADAS (2026-02-16 21:15)

✅ **Ajustes**: Sem integração bancária + CSV Reconciliation  
✅ **Stack Tech**: Next.js 14 + Tailwind + Prisma + PostgreSQL + Recharts  
✅ **Modelo IA**: Sonnet 4.5 ($2.40 custo total)  
✅ **Timeline**: 14 dias (MVP otimizado)  
✅ **Coordenação**: Gu + Maya + DevBoy (3 pessoas, dia a dia no grupo)  
✅ **Design**: Shadcn/ui (componentes prontas, Tailwind)

---

## 10. PRÓXIMOS PASSOS

1. **Gu entra no grupo** "Clawd - Akasha Finance"
2. **Define os 3 ajustes** (diferenças vs Mobills)
3. **Confirma stack tech**
4. **DevBoy gera boilerplate** e começa Fase 1
5. **Reunião semanal** pra sync de progresso

---

## 11. DOCUMENTOS ASSOCIADOS

- `Mobills-Analysis-Report.md` — Análise completa do Mobills (7 funcionalidades principais)
- `memory/YYYY-MM-DD.md` — Daily notes sobre o projeto
- Grupo Telegram: "Clawd - Akasha Finance" — Espaço de trabalho

---

## Checkpoint de Status

| Fase | Status | Owner | Prazo |
|------|--------|-------|-------|
| Análise do Mobills | ✅ Completa | Maya | 2026-02-16 |
| Definição de Requisitos | ⏳ Pendente | Gu | 2026-02-16 |
| Stack Tech | ⏳ Pendente | Gu | 2026-02-17 |
| Boilerplate | ⏳ Aguardando | DevBoy | 2026-02-18 |
| MVP Development | ⏳ Não iniciado | DevBoy | 2026-03-02 |

---

**Última atualização:** 2026-02-16 20:56 (Maya)  
**Próxima revisão:** Após Gu confirmar os 3 ajustes
